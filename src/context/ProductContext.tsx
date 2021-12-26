import React from "react";
import {Product} from "../App";

type ProductContextType = {
    products: Product[],
    addProduct(product: Product): void,
}

let defaultProductContext: ProductContextType = {
    products: [],
    addProduct: (product: Product) => {},
}
export const ProductContext = React.createContext(defaultProductContext)
ProductContext.displayName = 'ProductContext';

export type {ProductContextType}