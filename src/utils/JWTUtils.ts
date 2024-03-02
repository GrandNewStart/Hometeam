export const getPayload = (jwt:string)=>{
    const parts = jwt.split('.')
    if (parts.length !== 3) {
        throw { message: 'Token is not divided into 3 parts' }
    }
    const payload = parts[1]
    const buffer = Buffer.from(payload, 'base64')
    const json = JSON.parse(buffer.toString('utf-8'))
    return json
}