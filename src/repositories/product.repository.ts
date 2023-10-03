import {productTable} from "../db-implementation/state.ts";
import {deepClone} from "../helpers/deepClone.ts";
import {ProductEntity} from "../entities/product.entity.ts";

export const getProductById = (productId: string): ProductEntity => {
    const product = productTable.find(({id}) => id === productId);
    if(!product) throw "Product not found";

    return deepClone(product);
}

export const getAllProducts = (): ProductEntity[] => {
    return productTable.map((product) => {
        return deepClone(product);
    })
}