const host = process.env.REACT_APP_HOST || 'http://127.0.0.1/'

export const doRequest = async (url: string, method: HttpMethodType, body = {}, headers = {}) => {
    let request: RequestInit = {
        method: method.toString(),
        credentials: 'include'
    }
    if (method != HttpMethodType.GET && method != HttpMethodType.HEAD) {
        Object.assign(request, {
            body: body,
            headers: headers
        })
    }
    return await fetch(`${host}${url}`, request)
        .then(async (response) => {
            if(response.ok) {
                return await response.json();
            } else {
                throw response.status
            }
        })
}

export enum HttpMethodType {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD'
}