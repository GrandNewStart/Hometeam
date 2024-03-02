import * as Keychain from 'react-native-keychain'
import * as KeyUtils from '../utils/crypto/KeyUtils'

export const setMnemonic = async (mnemonic: string)=>{
    const result = await Keychain.setGenericPassword(
        'Hometeam Member Key', 
        mnemonic,
        {
            service: 'Hometeam',
            accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            storage: Keychain.STORAGE_TYPE.KC 
        }
    )
    if (result === false) {
        throw { message: '[KeychainUtils] setMnemonic: failed to save private key' }
    } else {
        console.log('[KeychainUtils] setMnemonic: ' + result)
    }
}

export const removeMnemonic = async ()=>{
    const result = await Keychain.resetGenericPassword(
        { 
            service: 'Hometeam',
            accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            storage: Keychain.STORAGE_TYPE.KC 
        }
    )
    if (result === true) {
        console.log('[KeychainUtils] removeMnemonic: SUCCESS')
    } else {
        console.log('[KeychainUtils] removeMnemonic: FAILURE')
    }
}

export const getMnemonic = async ()=>{
    const result = await Keychain.getGenericPassword({ 
        service: 'Hometeam',
        accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        storage: Keychain.STORAGE_TYPE.KC 
    })
    if (result === false)
        throw { message: 'failed to get private key' }
    else  {
        return result.password
    }
}