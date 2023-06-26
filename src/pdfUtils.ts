import {bytesToHex} from './hexUtils'

const ArrayBufferToString = (arrayBuffer: ArrayBuffer) => {
  let binaryString = '',
      bytes = new Uint8Array(arrayBuffer),
      length = bytes.length
  for (let i = 0; i < length; i++) {
    binaryString += String.fromCharCode(bytes[i])
  }
  return binaryString
}

const StringToArrayBuffer = (str: string) => {
  let buf = new ArrayBuffer(str.length)
  let bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const extractHash = async (pdfString: string) => {
  // Turn again into uintarray and calculate the hash
  const uint = StringToArrayBuffer(pdfString)
  console.log("New Value: ", uint);
  let digest;

  if(typeof window !== 'undefined' && window.crypto){  
     const crypto = window.crypto // TODO: use msrCrypto for IE11
     digest = await crypto.subtle.digest('SHA-256', uint)
     if (!crypto) {
      throw new Error('You are using an unsupported browser. Please use a modern browser like latest Chrome or Firefox.')
    }
  }
  else{
    const crypto = require("crypto")
    digest = await crypto.createHash('sha256').update(new Uint8Array(uint)).digest();  
  }
 
  return bytesToHex(new Uint8Array(digest))
}

export {ArrayBufferToString, StringToArrayBuffer, extractHash}
