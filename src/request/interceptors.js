import { message } from 'antd';
export default function interceptors(res) {
    return new Promise(async (resolve, reject) => {
        try {
            switch (res.status) {
                case 200:
                    const data = await res.json()
                    switch (data.code) {
                        case undefined:
                            resolve(data)
                            break;
                        case 100:
                            resolve(data)
                            break;
                        default:
                            message.error(data.msg)
                            reject(data.msg);
                            break;
                    }
                    break;
                case 400:
                    message.error('请求参数有误')
                    reject('请求参数有误')
                    break;
                case 401:
                    message.error('账号未授权')
                    reject('账号未授权')
                    break;
                case 403:
                    message.error('账号无权限')
                    reject('账号无权限')
                    break
                case 404:
                    message.error('请求地址有误')
                    reject('请求地址有误')
                    break
                case 405:
                    message.error('请求方法错误')
                    reject('请求方法错误')
                    break
                case 500:
                    message.error('服务器出错')
                    reject('服务器出错')
                    break
                default:
                    message.error('网络错误')
                    reject('网络错误')
                    break
            }
        } catch (error) {
            reject(error)
        }
    })
}