import * as Keychain from 'react-native-keychain'

export const setPrivateKey = async (key: string)=>{
    const result = await Keychain.setGenericPassword(
        'Hometeam Member Key', 
        key,
        {
            service: 'Hometeam',
            accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            storage: Keychain.STORAGE_TYPE.KC 
        }
    )
    if (result === false) {
        throw { message: '[KeychainUtils] setPrivateKey: failed to save private key' }
    } else {
        console.log('[KeychainUtils] setPrivateKey: ' + result)
    }
}

export const removePrivateKey = async ()=>{
    const result = await Keychain.resetGenericPassword(
        { 
            service: 'Hometeam',
            accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            storage: Keychain.STORAGE_TYPE.KC 
        }
    )
    if (result === true) {
        console.log('[KeychainUtils] removePrivateKey: SUCCESS')
    } else {
        console.log('[KeychainUtils] removePrivateKey: FAILURE')
    }
}

export const getPrivateKey = async ()=>{
    const result = await Keychain.getGenericPassword({ 
        service: 'Hometeam',
        accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        storage: Keychain.STORAGE_TYPE.KC 
    })
    if (result === false)
        throw { message: 'failed to get private key' }
    else 
        return result.password
}