import React from "react";

const initialState = {
    ids: [],
    selectedIds: []
};

export const IdsContext = React.createContext(initialState);
export const DataContext = React.createContext(null);
