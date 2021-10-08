import { get, post } from '../methods'
async function GetNotes(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await get('/Home/GetNotes', params)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
async function CollectNotes(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await post('/Home/CollectNotes', params)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
export {
    GetNotes,
    CollectNotes,
}