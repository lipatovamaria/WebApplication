import {doRequest, HttpMethodType} from "./Request";

export const AuthUser = async (username: string, password: string) => {
    let data = {
        username: username,
        password: password
    }
    return await doRequest(
        "user/in",
        HttpMethodType.POST,
        JSON.stringify(data),
        {"Content-Type": "application/json; charset=utf-8"}
    )
}

export const GetUser = async () => {
    return await doRequest("user/", HttpMethodType.GET)
}

export const RegUser = async (email: string, password: string) => {
    let data = {
        username: email,
        password: password
    }
    return await doRequest(
        "user/",
        HttpMethodType.POST,
        JSON.stringify(data),
        {"Content-Type": "application/json"}
    )
}

export const SignOutUser = async () => {
    return await doRequest("user/out", HttpMethodType.GET)
}