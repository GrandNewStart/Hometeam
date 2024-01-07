import '../../shim.js'
import crypto from 'crypto'
import * as x509 from "@peculiar/x509"
import { Crypto } from "@peculiar/webcrypto"
import KeyPair from '../types/KeyPair.js'

export const generateKeyPair = ()=>{
    console.log('[CryptoUtils] generateKeyPair')
    const kp = crypto.createECDH('secp256r1')
    kp.generateKeys()
    const privateKey = kp.getPrivateKey().toString('hex')
    const publicKey = kp.getPublicKey().toString('hex')
    return { privateKey, publicKey } as KeyPair
}

export const computeSharedSecret = (privateKey: string, publicKey: string)=>{
    const kp = crypto.createECDH('secp256r1')
    kp.setPrivateKey(privateKey, 'hex')
    const secret = kp.computeSecret(publicKey, 'hex')
    return secret.toString('hex')
}

export const createCSR = (email: string, kp: KeyPair)=>{
    
}