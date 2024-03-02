import axios from 'axios'
import KeyPair from '../types/KeyPair';
import * as SignatureUtils from '../utils/crypto/SignatureUtils';

const BASE_URL = 'https://hmnjw.store'

/** 인증코드 요청 */
export const requestAuthCode = async (email:string)=>{
    const config = { 
        baseURL: BASE_URL,
        url: '/users/auth-code',
        method: 'post',
        data: { email }
    }
    return axios.request(config).then((res) => {
            if (res.status >= 300) {
                throw new Error(res.data)
            }
        })
        .catch(err => {
            throw new Error(err.request._response)
        });
}

/** 인증코드 검증 */
export const verifyAuthCode = async (email:string, code:string)=>{
    const config = { 
        baseURL: BASE_URL,
        url: '/users/auth-code',
        method: 'put',
        data: { email, code }
    }
    return axios.request(config)
        .then(res=>{
            if (res.status >= 300) {
                throw new Error(res.data)
            } 
        })
        .catch(err=>{
            throw new Error(err.request._response)
        })
}

/** 회원가입 */
export const join = async (
    authCode: string,
    email: string,
    name: string, 
    encKey: string | null, 
    csr: string
)=>{
    const config = { 
        baseURL: BASE_URL,
        url: '/users/',
        method: 'post',
        data: { authCode, name, email, encKey, csr }
    }
    return axios.request(config)
        .then(res=>{
            if (res.status >= 300) {
                throw new Error(res.data)
            } else {
                return res.data
            }
        })
        .catch(err=>{
            throw new Error(err.request._response)
        })
}

/** 로그인 */
export const login = async (kp: KeyPair)=>{
    console.log('[LogInAPI] login')
    const requestChallenge = { 
        baseURL: BASE_URL,
        url: 'users/challenge/',
        method: 'post',
        data: { pubKey: kp.publicKey }
    }
    const challengeResponse = await axios.request(requestChallenge)
    console.log('[LogInAPI] login :: code:', challengeResponse.data)

    const signature = await SignatureUtils.createSignature(challengeResponse.data, kp.privateKey)
    console.log('[LogInAPI] login :: signature:', signature)

    const verified = SignatureUtils.verifySignature(challengeResponse.data, signature, kp.publicKey)
    console.log('[LogInAPI] login :: verified:', verified)

    const verifyChallenge = {
        baseURL: BASE_URL,
        url: 'users/challenge/',
        method: 'put',
        data: { pubKey: kp.publicKey, signature: signature }
    }
    const verifyResponse = await axios.request(verifyChallenge)
    return verifyResponse.data.jwtToken
}

export const getEncKey = async (email: string)=>{
    console.log(('[LogInAPI] getEncKey'))
    const response = await axios.request({
        baseURL: BASE_URL,
        url: `users/restore/${email}`,
        method: 'get',
    })
    return response.data.encKey
}