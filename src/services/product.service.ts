import * as productRepository from "../repositories/product.repository.ts";

export const getProductById = (id: string) => {
    return productRepository.getProductById(id);
}

export const getAllProducts = () => {
    return productRepository.getAllProducts();
}