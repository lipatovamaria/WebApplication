import {doRequest, HttpMethodType} from "./Request";
import {Product} from "../App";

export const AddProduct = async (newProduct: Product): Promise<Product> => {
    return await doRequest(
        "product/",
        HttpMethodType.POST,
        JSON.stringify(newProduct),
        {"Content-Type": "application/json; charset=utf-8"}
    )
}

export const GetProducts = async (): Promise<Product[]> => {
    return await doRequest("product/", HttpMethodType.GET)
}