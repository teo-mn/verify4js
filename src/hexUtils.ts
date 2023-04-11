// @ts-ignore
import {TextDecoder, TextEncoder} from 'text-encoding'

const textToHex = (input: string) => {
  let byte = new TextEncoder().encode(input)
  return bytesToHex(byte)
}

const hexToText = (hex: string) => {
  return new TextDecoder().decode(hexToBytes(hex))
}

const hexToBytes = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

const bytesToHex = (bytes: Uint8Array) => {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

export {textToHex, hexToText, hexToBytes, bytesToHex}
