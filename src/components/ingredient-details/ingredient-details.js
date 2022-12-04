import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientDetails = (props) => {
    return (
        <div className={`${ingredientDetailsStyles.modal} ${"pt-10 pb-10 pr-10 pl-10"}`}>
            
            {/* ШАПКА МОДАЛЬНОГО ОКНА */}
            <div className={`${ingredientDetailsStyles.modal_header}`}>
                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
                <button className={`${ingredientDetailsStyles.button}`} onClick={props.handleClick}>
                    <CloseIcon type="primary" />
                </button>
            </div>

            <img className="mb-4" src={props.image} alt={props.name} />
            <p className="text text_type_main-medium mb-8">{props.name}</p>

            <div className={`${ingredientDetailsStyles.composition} ${"mb-5"}`}>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">калории, ккал</p>
                    {props.calories}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">белки, г</p>
                    {props.proteins}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">жиры, г</p>
                    {props.fat}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">углеводы, г</p>
                    {props.carbohydrates}
                </div>
            </div>
        </div>
    );
}
