export const sha256 = (message:string)=>{
    const crypto = require('crypto')
    const hash = crypto.createHash('sha256')
    hash.update(message)
    return hash.digest('hex')
}