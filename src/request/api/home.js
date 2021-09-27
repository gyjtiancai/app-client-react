import { get } from '../methods'
async function GetNotesList(params) {
    return new Promise(async (resolve, reject) => {
        try {
            // await utils.awaitTokenBar(rootState.common)
            const res = await get('/Home/GetNotesList', params)
            resolve(res)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
export {
    GetNotesList,
}