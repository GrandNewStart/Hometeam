import '../../../shim'
import KeyPair from '../../types/KeyPair'

export const generateMnemonic = ()=>{
    const RANDOM_WORDS = require('random-words')
    return RANDOM_WORDS({exactly: 12, join: ' '})
}

export const generateKeyPair = (mnemonic:string) => {
    const BIP39 = require('bip39')
    const seed = BIP39.mnemonicToSeedSync(mnemonic)
    
    const BITCOIN = require('bitcoinjs-lib')
    const root = BITCOIN.bip32.fromSeed(seed, BITCOIN.networks.bitcoin)
    const path = 'm/32/0/0/0'
    const rootNode = root.derivePath(path)

    const ECCRYPTO = require('eccrypto')
    const privateKeyBuffer = Buffer.from(rootNode.toWIF()).slice(0, 32)
    const privateKey = privateKeyBuffer.toString('hex')
    const publicKeyBuffer = Buffer.from(ECCRYPTO.getPublicCompressed(privateKeyBuffer))
    const publicKey = publicKeyBuffer.toString('hex')

    return { privateKey, publicKey } as KeyPair
}

export const getPublicKey = (privateKey: string) => {
    const crypto = require('crypto')
    const ecdh = crypto.createECDH('secp256k1')
    ecdh.setPrivateKey(privateKey, 'hex')
    return ecdh.getPublicKey('hex')
}

export const getRandomBytes = (length:number) => {
    const crypto = require('crypto')
    const buffer = crypto.randomBytes(length)
    return buffer.toString('hex')
};
