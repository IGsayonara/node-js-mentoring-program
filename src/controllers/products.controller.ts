import * as productService from "../services/product.service.ts"
export const getProducts = (req, res) => {
    const products = productService.getAllProducts();
    res.json(products);
}

export const getProduct = (req, res) => {
    const product = productService.getProductById(req.params.id);
    res.json(product);
}