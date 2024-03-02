export const encrypt = (message:string, key:string, iv:string)=>{
    const chacha20 = require('chacha20')

    if (key.length !== 64) {
        throw new Error('Invalid key length. Key must be 64 hexadecimal characters (32 bytes).');
    }
    if (iv.length !== 24) {
        throw new Error('Invalid IV length. IV must be 24 hexadecimal characters (12 bytes).');
    }

    const encrypt = chacha20.encrypt(
        Buffer.from(key, 'hex'), 
        Buffer.from(iv, 'hex'), 
        Buffer.from(message, 'utf-8')
    )
    return encrypt.toString('hex')
}

export const decrypt = (cipherText:string, key:string, iv:string)=>{
    const chacha20 = require('chacha20')

    if (key.length !== 64) {
        throw new Error('Invalid key length. Key must be 64 hexadecimal characters (32 bytes).');
    }
    if (iv.length !== 24) {
        throw new Error('Invalid IV length. IV must be 24 hexadecimal characters (12 bytes).');
    }
    
    const decrypt = chacha20.decrypt(
        Buffer.from(key, 'hex'), 
        Buffer.from(iv, 'hex'), 
        Buffer.from(cipherText, 'hex')
    )
    return decrypt.toString()
}
