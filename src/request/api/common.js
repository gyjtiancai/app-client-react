import { get, post } from '../methods'
async function AuthorizeSDK(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await post('/Auth/AuthorizeSDK', params)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
async function GetAppUserInfo(params) {
    return new Promise(async (resolve, reject) => {
        try {
            // await utils.awaitTokenBar(rootState.common)
            const res = await get('/Common/User/GetAppUserInfo', params)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
export {
    AuthorizeSDK,
    GetAppUserInfo
}