/**
 * QR code for the gift card page (templates/gift_card.liquid).
 *
 * Shopify gives the theme `gift_card.qr_identifier` and nothing else: the code
 * has to be drawn by the theme. This is a byte-mode encoder, error correction
 * level M, versions 1 to 9 (up to 180 bytes), which covers the identifier
 * Shopify issues. Longer data returns null and the page keeps showing the code
 * in text, as it did before.
 *
 * The output is an SVG: it stays sharp at any size and needs no canvas.
 * Reference: ISO/IEC 18004. Checked module by module against an independent
 * implementation (segno 1.6.6) on 42 identifiers, versions 1 to 9.
 */
(function (root) {
  'use strict';

  var EC_LEVEL_M = 0; // index used by the format-information table below

  // Per version (1-9), error correction level M:
  // [ec codewords per block, [[block count, data codewords per block], …]]
  var BLOCKS_M = {
    1: [10, [[1, 16]]],
    2: [16, [[1, 28]]],
    3: [26, [[1, 44]]],
    4: [18, [[2, 32]]],
    5: [24, [[2, 43]]],
    6: [16, [[4, 27]]],
    7: [18, [[4, 31]]],
    8: [22, [[2, 38], [2, 39]]],
    9: [22, [[3, 36], [2, 37]]]
  };

  // Centres of the alignment patterns, per version.
  var ALIGNMENT = {
    1: [],
    2: [6, 18],
    3: [6, 22],
    4: [6, 26],
    5: [6, 30],
    6: [6, 34],
    7: [6, 22, 38],
    8: [6, 24, 42],
    9: [6, 26, 46]
  };

  /* --- GF(256), primitive polynomial 0x11D --- */
  var EXP = new Array(512);
  var LOG = new Array(256);
  (function buildTables() {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[LOG[a] + LOG[b]];
  }

  // Generator polynomial for `count` error correction codewords.
  function generator(count) {
    var poly = [1];
    for (var i = 0; i < count; i++) {
      var next = poly.concat([0]);
      for (var j = 0; j < poly.length; j++) {
        next[j + 1] ^= gfMul(poly[j], EXP[i]);
      }
      poly = next;
    }
    return poly;
  }

  function errorCodewords(data, count) {
    var gen = generator(count);
    var remainder = data.concat(new Array(count).fill(0));
    for (var i = 0; i < data.length; i++) {
      var factor = remainder[i];
      if (factor === 0) continue;
      for (var j = 0; j < gen.length; j++) {
        remainder[i + j] ^= gfMul(gen[j], factor);
      }
    }
    return remainder.slice(data.length);
  }

  /* --- Data codewords --- */

  function utf8Bytes(text) {
    var out = [];
    var encoded = encodeURIComponent(text);
    for (var i = 0; i < encoded.length; i++) {
      if (encoded[i] === '%') {
        out.push(parseInt(encoded.substr(i + 1, 2), 16));
        i += 2;
      } else {
        out.push(encoded.charCodeAt(i));
      }
    }
    return out;
  }

  function dataCapacity(version) {
    var entry = BLOCKS_M[version];
    var total = 0;
    for (var i = 0; i < entry[1].length; i++) {
      total += entry[1][i][0] * entry[1][i][1];
    }
    return total;
  }

  function pickVersion(byteLength) {
    for (var version = 1; version <= 9; version++) {
      // 4 bits for the byte mode indicator, 8 for the character count.
      if (byteLength + 2 <= dataCapacity(version)) return version;
    }
    return 0;
  }

  function codewords(bytes, version) {
    var bits = [];
    function push(value, length) {
      for (var i = length - 1; i >= 0; i--) bits.push((value >> i) & 1);
    }
    push(4, 4); // byte mode
    push(bytes.length, 8); // character count, 8 bits up to version 9
    for (var i = 0; i < bytes.length; i++) push(bytes[i], 8);

    var capacityBits = dataCapacity(version) * 8;
    push(0, Math.min(4, capacityBits - bits.length)); // terminator
    while (bits.length % 8 !== 0) bits.push(0);

    var words = [];
    for (var b = 0; b < bits.length; b += 8) {
      var word = 0;
      for (var k = 0; k < 8; k++) word = (word << 1) | bits[b + k];
      words.push(word);
    }
    var pad = [0xec, 0x11];
    while (words.length < dataCapacity(version)) {
      words.push(pad[(words.length - bits.length / 8) % 2]);
    }
    return words;
  }

  // Data blocks and error correction blocks, interleaved as the standard asks.
  function finalSequence(words, version) {
    var entry = BLOCKS_M[version];
    var ecCount = entry[0];
    var blocks = [];
    var at = 0;
    for (var g = 0; g < entry[1].length; g++) {
      for (var n = 0; n < entry[1][g][0]; n++) {
        var size = entry[1][g][1];
        var data = words.slice(at, at + size);
        at += size;
        blocks.push({ data: data, ec: errorCodewords(data, ecCount) });
      }
    }
    var out = [];
    var longest = 0;
    for (var i = 0; i < blocks.length; i++) {
      longest = Math.max(longest, blocks[i].data.length);
    }
    for (var c = 0; c < longest; c++) {
      for (var bi = 0; bi < blocks.length; bi++) {
        if (c < blocks[bi].data.length) out.push(blocks[bi].data[c]);
      }
    }
    for (var e = 0; e < ecCount; e++) {
      for (var bj = 0; bj < blocks.length; bj++) out.push(blocks[bj].ec[e]);
    }
    return out;
  }

  /* --- Matrix --- */

  function emptyMatrix(size) {
    var m = [];
    for (var r = 0; r < size; r++) {
      m.push(new Array(size).fill(null)); // null = free module
    }
    return m;
  }

  function placeFinder(m, row, col) {
    for (var r = -1; r <= 7; r++) {
      for (var c = -1; c <= 7; c++) {
        var rr = row + r;
        var cc = col + c;
        if (rr < 0 || cc < 0 || rr >= m.length || cc >= m.length) continue;
        var inRing = r >= 0 && r <= 6 && c >= 0 && c <= 6;
        var dark =
          inRing &&
          (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        m[rr][cc] = dark ? 1 : 0;
      }
    }
  }

  function placeAlignment(m, version) {
    var centres = ALIGNMENT[version];
    var last = m.length - 7;
    for (var i = 0; i < centres.length; i++) {
      for (var j = 0; j < centres.length; j++) {
        var row = centres[i];
        var col = centres[j];
        // The three centres that fall on a finder pattern carry no alignment
        // pattern. The others do, including those centred on the timing
        // pattern, whose modules they replace.
        if (row === 6 && col === 6) continue;
        if (row === 6 && col === last) continue;
        if (row === last && col === 6) continue;
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            var edge = Math.max(Math.abs(r), Math.abs(c));
            m[row + r][col + c] = edge === 1 ? 0 : 1;
          }
        }
      }
    }
  }

  function placeFunctionPatterns(m, version) {
    var size = m.length;
    placeFinder(m, 0, 0);
    placeFinder(m, 0, size - 7);
    placeFinder(m, size - 7, 0);
    for (var i = 8; i < size - 8; i++) {
      var dark = i % 2 === 0 ? 1 : 0;
      m[6][i] = dark;
      m[i][6] = dark;
    }
    placeAlignment(m, version);
    m[size - 8][8] = 1; // dark module
  }

  function reservedForInfo(size, version, row, col) {
    if (row === 6 || col === 6) return true; // timing
    if (row < 9 && col < 9) return true; // format + top-left finder
    if (row < 9 && col >= size - 8) return true;
    if (col < 9 && row >= size - 8) return true;
    if (version >= 7) {
      if (col < 6 && row >= size - 11 && row <= size - 9) return true;
      if (row < 6 && col >= size - 11 && col <= size - 9) return true;
    }
    return false;
  }

  function placeData(m, sequence, version) {
    var size = m.length;
    var bitIndex = 0;
    var upwards = true;
    for (var col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--; // skip the vertical timing pattern
      for (var step = 0; step < size; step++) {
        var row = upwards ? size - 1 - step : step;
        for (var pair = 0; pair < 2; pair++) {
          var c = col - pair;
          if (m[row][c] !== null) continue;
          var bit = 0;
          if (bitIndex < sequence.length * 8) {
            bit = (sequence[bitIndex >> 3] >> (7 - (bitIndex & 7))) & 1;
          }
          bitIndex++;
          m[row][c] = bit;
        }
      }
      upwards = !upwards;
    }
  }

  function maskBit(mask, row, col) {
    switch (mask) {
      case 0:
        return (row + col) % 2 === 0;
      case 1:
        return row % 2 === 0;
      case 2:
        return col % 3 === 0;
      case 3:
        return (row + col) % 3 === 0;
      case 4:
        return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
      case 5:
        return ((row * col) % 2) + ((row * col) % 3) === 0;
      case 6:
        return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
      default:
        return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
    }
  }

  function bchFormat(value) {
    var v = value << 10;
    while (bitLength(v) >= 11) v ^= 0x537 << (bitLength(v) - 11);
    return ((value << 10) | v) ^ 0x5412;
  }

  function bchVersion(version) {
    var v = version << 12;
    while (bitLength(v) >= 13) v ^= 0x1f25 << (bitLength(v) - 13);
    return (version << 12) | v;
  }

  function bitLength(value) {
    var length = 0;
    while (value !== 0) {
      length++;
      value >>>= 1;
    }
    return length;
  }

  function placeFormatInfo(m, mask) {
    var size = m.length;
    var bits = bchFormat((EC_LEVEL_M << 3) | mask);
    for (var i = 0; i < 15; i++) {
      var bit = (bits >> i) & 1;
      // Copy beside the top-left finder…
      if (i < 6) m[i][8] = bit;
      else if (i < 8) m[i + 1][8] = bit;
      else if (i === 8) m[8][7] = bit;
      else m[8][14 - i] = bit;
      // …and the second copy, split between the other two finders.
      if (i < 8) m[8][size - 1 - i] = bit;
      else m[size - 15 + i][8] = bit;
    }
  }

  function placeVersionInfo(m, version) {
    if (version < 7) return;
    var size = m.length;
    var bits = bchVersion(version);
    for (var i = 0; i < 18; i++) {
      var bit = (bits >> i) & 1;
      var row = Math.floor(i / 3);
      var col = i % 3;
      m[size - 11 + col][row] = bit;
      m[row][size - 11 + col] = bit;
    }
  }

  /* --- Mask penalty (ISO/IEC 18004, 8.8.2) --- */

  function penalty(m) {
    var size = m.length;
    var score = 0;
    var dark = 0;
    var line;

    function runPenalty(run) {
      return run >= 5 ? 3 + (run - 5) : 0;
    }

    for (var r = 0; r < size; r++) {
      var runRow = 1;
      var runCol = 1;
      for (var c = 1; c < size; c++) {
        if (m[r][c] === m[r][c - 1]) runRow++;
        else {
          score += runPenalty(runRow);
          runRow = 1;
        }
        if (m[c][r] === m[c - 1][r]) runCol++;
        else {
          score += runPenalty(runCol);
          runCol = 1;
        }
      }
      score += runPenalty(runRow) + runPenalty(runCol);
    }

    for (var br = 0; br < size - 1; br++) {
      for (var bc = 0; bc < size - 1; bc++) {
        var v = m[br][bc];
        if (v === m[br][bc + 1] && v === m[br + 1][bc] && v === m[br + 1][bc + 1]) score += 3;
      }
    }

    var finder = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    var finderReversed = finder.slice().reverse();
    function matches(values, start, pattern) {
      for (var i = 0; i < pattern.length; i++) {
        if (values[start + i] !== pattern[i]) return false;
      }
      return true;
    }
    for (var i = 0; i < size; i++) {
      var rowValues = m[i];
      var colValues = [];
      for (var j = 0; j < size; j++) colValues.push(m[j][i]);
      for (var k = 0; k + 11 <= size; k++) {
        if (matches(rowValues, k, finder) || matches(rowValues, k, finderReversed)) score += 40;
        if (matches(colValues, k, finder) || matches(colValues, k, finderReversed)) score += 40;
      }
    }

    for (var dr = 0; dr < size; dr++) {
      line = m[dr];
      for (var dc = 0; dc < size; dc++) dark += line[dc];
    }
    var percent = (dark * 100) / (size * size);
    score += Math.floor(Math.abs(percent - 50) / 5) * 10;
    return score;
  }

  /* --- Public --- */

  // Returns the modules as an array of rows of 0/1, or null when the data is
  // longer than version 9 can hold.
  function matrix(text) {
    var bytes = utf8Bytes(String(text));
    var version = pickVersion(bytes.length);
    if (!version) return null;

    var sequence = finalSequence(codewords(bytes, version), version);
    var size = 17 + version * 4;
    var best = null;
    var bestScore = Infinity;
    for (var mask = 0; mask < 8; mask++) {
      var m = emptyMatrix(size);
      placeFunctionPatterns(m, version);
      var reserved = [];
      for (var r = 0; r < size; r++) {
        reserved.push([]);
        for (var c = 0; c < size; c++) {
          reserved[r].push(reservedForInfo(size, version, r, c) || m[r][c] !== null);
        }
      }
      for (var rr = 0; rr < size; rr++) {
        for (var cc = 0; cc < size; cc++) {
          if (reserved[rr][cc] && m[rr][cc] === null) m[rr][cc] = 0;
        }
      }
      placeData(m, sequence, version);
      for (var mr = 0; mr < size; mr++) {
        for (var mc = 0; mc < size; mc++) {
          if (!reserved[mr][mc] && maskBit(mask, mr, mc)) m[mr][mc] ^= 1;
        }
      }
      placeFormatInfo(m, mask);
      placeVersionInfo(m, version);
      var score = penalty(m);
      if (score < bestScore) {
        bestScore = score;
        best = m;
      }
    }
    return best;
  }

  // One <svg> string, drawn as a single path. `quiet` is the mandatory margin,
  // four modules by default.
  function svg(text, options) {
    var m = matrix(text);
    if (!m) return null;
    var settings = options || {};
    var quiet = settings.quiet == null ? 4 : settings.quiet;
    var size = m.length + quiet * 2;
    var parts = [];
    for (var r = 0; r < m.length; r++) {
      for (var c = 0; c < m.length; c++) {
        if (m[r][c]) parts.push('M' + (c + quiet) + ' ' + (r + quiet) + 'h1v1h-1z');
      }
    }
    var label = settings.label ? String(settings.label).replace(/"/g, '&quot;') : '';
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
      size +
      ' ' +
      size +
      '" width="' +
      (settings.pixels || 160) +
      '" height="' +
      (settings.pixels || 160) +
      '" shape-rendering="crispEdges" role="img" aria-label="' +
      label +
      '">' +
      '<rect width="' +
      size +
      '" height="' +
      size +
      '" fill="#fff"/>' +
      '<path d="' +
      parts.join('') +
      '" fill="#000"/>' +
      '</svg>'
    );
  }

  var api = { matrix: matrix, svg: svg };
  if (root) root.flyerGiftCardQR = api;

  // Gift card page: draw the code into the placeholder the template renders.
  if (typeof document !== 'undefined') {
    var draw = function () {
      var holder = document.querySelector('[data-gift-card-qr]');
      if (!holder) return;
      var markup = svg(holder.getAttribute('data-gift-card-qr'), {
        pixels: Number(holder.getAttribute('data-size')) || 160,
        label: holder.getAttribute('data-label') || ''
      });
      if (markup) holder.innerHTML = markup;
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', draw, { once: true });
    } else {
      draw();
    }
  }
})(typeof window !== 'undefined' ? window : null);
