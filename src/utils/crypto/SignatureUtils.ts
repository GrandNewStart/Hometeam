import '../../../shim'
import * as KeychainUtils from '../../utils/KeychainUtils'
import * as KeyUtils from '../../utils/crypto/KeyUtils'

export const createSignature = (message: string, key: string)=>{
    const { KJUR, KEYUTIL } = require('jsrsasign')

    const privateKeyPEM = hexToPem(key)
    const privateKey = KEYUTIL.getKey(privateKeyPEM)
    const signer = new KJUR.crypto.Signature({alg: 'SHA256withECDSA'})
    signer.init(privateKey)
    signer.updateString(message)

    const signHex = signer.sign()
    return signHex
}

export const verifySignature = (message: string, signature: string, publicKey: string)=>{
    const { KJUR } = require('jsrsasign')

    const sign = new KJUR.crypto.Signature({ alg: 'SHA256withECDSA' });
    sign.init({ xy: publicKey, curve: "secp256k1" });
    sign.updateString(message);
    const verified = sign.verify(signature);

    return verified
}

export const hexToPem = (key: string)=>{
    const eccrypto = require('eccrypto')
    const { KEYUTIL } = require('jsrsasign')

    const kp = KEYUTIL.generateKeypair('EC', 'secp256k1')
    const uncompressedPubKey = eccrypto.getPublic(Buffer.from(key, 'hex')).toString('hex')
    kp.prvKeyObj.setPrivateKeyHex(key)
    kp.prvKeyObj.setPublicKeyHex(uncompressedPubKey)
    kp.pubKeyObj.setPublicKeyHex(uncompressedPubKey)
    const pem = KEYUTIL.getPEM(kp.prvKeyObj, 'PKCS8PRV')
    
    return pem
}

export const test = async ()=>{
    const { KJUR, KEYUTIL } = require('jsrsasign')

    const mnemonic = await KeychainUtils.getMnemonic()
    const keyPair = KeyUtils.generateKeyPair(mnemonic)

    const pem = hexToPem(keyPair.privateKey)
    const privateKey = KEYUTIL.getKey(pem)
    console.log(pem)

    const signer = new KJUR.crypto.Signature({alg: 'SHA256withECDSA'})
    signer.init(privateKey)
    signer.updateString('Hello')
    const signature = signer.sign()

    console.log('Signature: ' + signature)

    const verifier = new KJUR.crypto.Signature({ alg: 'SHA256withECDSA' });
    verifier.init({ xy: keyPair.publicKey, curve: "secp256k1" });
    verifier.updateString('Hello');
    const verified = verifier.verify(signature);

    console.log('Verified: ' + verified)
}