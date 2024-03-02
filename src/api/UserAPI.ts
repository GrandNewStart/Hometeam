import axios from "axios"

const BASE_URL = 'https://hmnjw.store'

/** 유저 정보 조회 */
export const getUserInfo = async (id:string)=>{
    console.log('[UserApi] getUserInfo: id =', id)
    const response = await axios.request({
        baseURL: BASE_URL,
        url: `/users/${id}`,
        method: 'get',
    })
    
    return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
    }
}