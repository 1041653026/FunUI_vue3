import request from '@/utils/request';

let Api_Domain = '192.168.0.1';

function commonGet(data) {
    return request({
        url: `${Api_Domain}${data.url}`,
        method: 'get',
        params: data.params
    })
}

function commonPost(data, type) {
    let headers = {
        json: { 'Content-Type': 'application/json; charset=UTF-8' },
        form: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        file: { 'Content-Type': 'multiple/form-data; charset=UTF-8' }
    }
    return request({
        url: `${Api_Domain}${data.url}`,
        method: 'post',
        data: data.params,
        headers: type ? headers[type] : headers['json']
    })
}
export default {
    commonGet,
    commonPost
}