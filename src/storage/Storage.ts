import EncryptedStorage from "react-native-encrypted-storage"
import UserInfoProp from "../types/UserInfoProp"

export const getUserInfo = async ()=>{
    const string = await EncryptedStorage.getItem('user_info')
    if (!string) return null
    const result: UserInfoProp = JSON.parse(string)
    return result
}

export const setUserInfo = async (account: UserInfoProp)=>{
    const string = JSON.stringify(account)
    await EncryptedStorage.setItem('user_info', string)
}