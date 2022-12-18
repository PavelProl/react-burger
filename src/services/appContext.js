import React from "react";

const initialIdsState = {
    ids: [],
    selectedIds: []
};

const initialDataState = {
    data: [],
    selectedIngredients: []
};

export const IdsContext = React.createContext(initialIdsState);
export const DataContext = React.createContext(initialDataState);
export const PriceContext = React.createContext();
export const BunsContext = React.createContext();
