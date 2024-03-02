export const computeSharedSecret = (privateKey: string, publicKey: string)=>{
    const crypto = require('crypto')
    const kp = crypto.createECDH('secp256r1')
    kp.setPrivateKey(privateKey, 'hex')
    const secret = kp.computeSecret(publicKey, 'hex')
    return secret.toString('hex')
}
