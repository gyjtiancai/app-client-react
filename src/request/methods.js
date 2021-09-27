import interceptors from "./interceptors"

function get(url, params) {
    const headers = new Headers()
    // let newUrl = `${process.env.REACT_APP_MAIN_HOST}${url}`
    let newUrl = `/api${url}`
    if (params && Object.keys(params).length) {
        newUrl = `${newUrl}?`
        for (let key in params) {
            newUrl = `${newUrl}${key}=${params[key]}&`
        }
        newUrl = newUrl.substring(0, newUrl.length - 1)
    }
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(newUrl, {
                method: 'GET',
                credentials: 'include',
                headers: headers
            })
            const data = await interceptors(res)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function post(url, params = {}) {
    const headers = new Headers({ "Content-Type": "application/json" })
    // let newUrl = `${process.env.REACT_APP_MAIN_HOST}${url}`
    let newUrl = `/api${url}`
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(newUrl, {
                method: 'POST',
                body: JSON.stringify(params),// params can be `string` or {object}!
                credentials: 'include',
                headers: headers
            })
            const data = await interceptors(res)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export { get, post }
