"use strict";
exports.__esModule = true;
exports.bytesToHex = exports.hexToBytes = exports.hexToText = exports.textToHex = void 0;
// @ts-ignore
var text_encoding_1 = require("text-encoding");
var textToHex = function (input) {
    var byte = new text_encoding_1.TextEncoder().encode(input);
    return bytesToHex(byte);
};
exports.textToHex = textToHex;
var hexToText = function (hex) {
    return new text_encoding_1.TextDecoder().decode(hexToBytes(hex));
};
exports.hexToText = hexToText;
var hexToBytes = function (hex) {
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i !== bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
};
exports.hexToBytes = hexToBytes;
var bytesToHex = function (bytes) {
    return Array.from(bytes, function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
};
exports.bytesToHex = bytesToHex;
