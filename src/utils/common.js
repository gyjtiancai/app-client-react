function sleep(wait) {
    return new Promise((resolve) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, wait)
    })
}
//去重
function removeRepeat(arr, key = "") {
    if (arr instanceof Array) {
        if (arr.toString().includes("[object Object]")) {
            let arr_removeRepeat = [];
            let obj = {};
            for (let i in arr) {
                if (!obj[arr[i][key]]) {
                    arr_removeRepeat.push(arr[i]);
                    obj[arr[i][key]] = true;
                }
            }
            return arr_removeRepeat
        } else {
            return [...new Set(arr)]
        }
    }
    return arr
}
export {
    sleep,
    removeRepeat
}