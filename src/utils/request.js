import { error } from './Message'
import appState from '../store/app-state'
const axios = require('axios')

export const BASE_URL = 'kill.hchyeria.com'

const request = async (
  {
    method = 'GET',
    url,
    data = {},
    ...rest
  }
) => {
    const token = localStorage.getItem('token') || ''
    let headers = token 
                    ?   {
                            'Authorization': token
                        }
                    :   {}
    if (rest.headers) {
        headers = {
            ...headers,
            ...rest.headers
        }
    }
    let result
    try {
        result = await axios({
            method,
            url: `https://${BASE_URL}/api/${url}`,
            data,
            ...rest,
            headers
            
        })
    } catch (e) {
        throw e
        error(e.toString())
        return
    }
    
    const body = result.data

    if (result.status !== 200 || !body.status) {
        if (body.data) {
            const { errCode = 100, errMsg = '' } = body.data;
            if (errCode === 203) {
                appState.logout()
            }
            error(errCode + ': ' + errMsg)
        }
        
    }

    if (result.config.responseType === 'arraybuffer') {
        let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(body).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        return imgUrl
    }

    return body;
}

export const get = async ({ url, params = {}, ...rest }) => {
    const param = (params && Object.keys(params).map(ele => ele + '=' + params[ele]).join('&')) || ''
    const res = await request({
        url: param
            ? url + '?' + param
            : url,
        ...rest
    })
    return res;
}

export const post = async ({ url, data = {}}) => {
    var urlencoded = new URLSearchParams();
    let keys = Object.keys(data)
    if (keys && keys.length) {
        for (let k of keys) {
            urlencoded.append(k, data[k])
        }
    }
    const res = await request({
        method: 'POST',
        url,
        data: urlencoded,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return res;
}

