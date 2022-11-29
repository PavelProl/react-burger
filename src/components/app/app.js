import React from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

export const App = () => {
    return (
        <>
            <AppHeader />
            <div className={`${appStyles.constructor} ${"mb-10"}`}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>

        </>
    );
}
