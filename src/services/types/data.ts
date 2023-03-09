export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id: string;
};

export type TData = Omit<TIngredient, "id">;

export type TOrderNumber = {
    number: number
};

export type TUser = {
    // id?: number;
    password?: string;
    email?: string;
    name?: string;
};
