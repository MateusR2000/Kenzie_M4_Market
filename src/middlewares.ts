import {NextFunction, Request, Response} from "express";
import market from "./database";
import { IProduct, TProductCreate, TProductUpdate } from "./interfaces";

const verifyId = (
    request: Request,
    response: Response,
    next: NextFunction
): void | Response => {
    const {productId} = request.params;

    const foundProduct: IProduct | undefined = market.find(
        (val: IProduct): boolean => val.id === Number(productId)
    )

    if(!foundProduct){
        return response.status(404).json({message: "Product not found."});
    }

    response.locals = {
        ...response.locals,
        foundProduct,
        productIndex: market.indexOf(foundProduct)
    }

    return next();
}

const verifyNameCreate = (
    request: Request,
    response: Response,
    next: NextFunction
): void | Response => {
    const payload: IProduct = request.body;

    const checkDuplicates = market.some((marketProduct: IProduct) => marketProduct.name === payload.name)
    

    if(checkDuplicates){
        return response.status(409).json({message: "Product already registered."});
    }

    return next();
}

const verifyNameUpdate = (
    request: Request,
    response: Response,
    next: NextFunction
): void | Response => {
    const {name} = request.body;
    if(!name) return next();

    const foundProduct: IProduct | undefined = market.find(
        (val:IProduct): boolean => val.name === name
    )

    if(foundProduct){
        return response.status(409).json({message: "Product already registered."})
    }

    return next();
}

export default {verifyId, verifyNameCreate, verifyNameUpdate}