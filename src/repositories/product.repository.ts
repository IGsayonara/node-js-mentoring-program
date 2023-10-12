import {IProduct} from "../interfaces/product.interface.ts";
import {AppDataSource} from "../database/data-source.ts";
import {Product} from "../entities/product.entity.ts";

export const productRepository = AppDataSource.getRepository(Product);

export const getProductById = async(productId: string): Promise<IProduct> => {
    const product = productRepository.findOneBy({id: productId});
    if(!product) throw {message: "Product not found", code: 404};

    return product;
}

export const getAllProducts = async(): Promise<IProduct[]> => {
    return await productRepository.find()
}