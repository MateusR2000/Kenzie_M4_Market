import market from "./database";
import {Request, Response, request} from "express";
import { TProductCreate, IFoodProduct, IProduct, TProductUpdate, ICleaningProduct } from "./interfaces";

let count = 0;

const createProducts = (request: Request, response: Response): Response => {
    const payload: (ICleaningProduct | IFoodProduct) = request.body;

    const id = count += 1;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+365)

    let newProduct: IProduct = {
        id,
        name: payload.name,
        price: payload.price,
        weight: payload.weight,
        section: payload.section,
        expirationDate
    }

    if (payload.section === "food"){
        const foodProduct: IFoodProduct = {
            ...newProduct,
            calories: (payload as IFoodProduct).calories
        }
        newProduct = foodProduct;
        market.push(newProduct)
    }else{
        const cleaningProduct: ICleaningProduct = {
            ...newProduct
        }
        market.push(cleaningProduct)
    }

    return response.status(201).json(newProduct);
}

const readProducts = (request: Request, response: Response): Response => {
    const total = market.reduce((total, product)=>
        total + product.price,0
    )

    const object = {total: total, products: market};
    return response.json(object);
}

const retrieveProduct = (request: Request, response: Response): Response => {
    const {productId} = request.params;

    const product: IProduct | undefined = market.find((val): boolean => val.id === Number(productId));

    return response.status(200).json(product);
}

const updateProducts = (request: Request, response: Response): Response => {
    const {productId} = request.params;
    const payload: TProductUpdate = request.body;

    const productIndex: number = market.findIndex((val):boolean => val.id === Number(productId));

    const updatedProduct: IProduct = (market[productIndex] = {
        ...market[productIndex],
        ...payload,
    })
    return response.status(200).json(updatedProduct);
}

const deleteProduct = (request: Request, response: Response): Response => {
    const {productId} = request.params;

    const productIndex: number = market.findIndex((val): boolean => val.id === Number(productId));

    market.splice(productIndex, 1);
    return response.status(204).json();
}

export default {readProducts, retrieveProduct, createProducts, updateProducts, deleteProduct}