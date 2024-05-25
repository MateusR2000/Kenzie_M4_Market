export interface IProduct{
    id: number,
    name: string,
    price: number,
    weight: number,
    section: "cleaning" | "food",
    expirationDate: Date
}

export interface ICleaningProduct extends IProduct{}

export interface IFoodProduct extends IProduct{
    calories: number | null | undefined,
}

export type TProductCreate = Omit<IProduct, "id" | "expirationDate">;
export type TProductUpdate = Partial<TProductCreate>;