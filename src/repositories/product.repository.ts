import {ProductEntity} from "../interfaces/product.entity.ts";
import {AppDataSource} from "../database/data-source.ts";
import {Product} from "../entity/product.entity.ts";

export const productRepository = AppDataSource.getRepository(Product);

export const getProductById = async(productId: string): Promise<ProductEntity> => {
    const product = productRepository.findOneBy({id: productId});
    if(!product) throw {message: "Product not found", code: 404};

    return product;
}

export const getAllProducts = async(): Promise<ProductEntity[]> => {
    return await productRepository.find()
}