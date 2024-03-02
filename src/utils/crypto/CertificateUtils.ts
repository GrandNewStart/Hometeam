import KeyPair from "../../types/KeyPair"

export const createCSR = (email: string, kp: KeyPair)=>{
    const {KJUR, KEYUTIL} = require('jsrsasign')
    const eccrypto = require('eccrypto')

    const keypair = KEYUTIL.generateKeypair('EC', 'secp256r1')
    const uncompressedPublicKey = eccrypto.getPublic(Buffer.from(kp.privateKey, 'hex')).toString('hex')
    keypair.prvKeyObj.setPrivateKeyHex(kp.privateKey)
    keypair.prvKeyObj.setPublicKeyHex(uncompressedPublicKey)
    keypair.pubKeyObj.setPublicKeyHex(uncompressedPublicKey)

    const subjectString = `/CN=Hometeam/C=KR/ST=Seoul Songpa/O=Xperix Inc/E=${email}`
    const csr = KJUR.asn1.csr.CSRUtil.newCSRPEM({
        subject: { str: subjectString },
        sbjpubkey: keypair.pubKeyObj,
        sigalg: 'SHA256withECDSA',
        sbjprvkey: keypair.prvKeyObj
    })
    return csr
}