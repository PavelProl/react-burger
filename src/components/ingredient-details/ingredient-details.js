import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ingredientDetailsStyles from "./ingredient-details.module.css";

export const IngredientDetails = () => {
    const { id } = useParams();
    const ingredient = useSelector(store => store.ingredients.ingredients.find((el) => el._id === id));
    const {image, name, calories, proteins, fat, carbohydrates} = ingredient;
    return (
        <div className={`${ingredientDetailsStyles.ingredientDetails_content} ${"mb-15"}`}>
            <img className="mb-4" src={image} alt={name} />
            <p className="text text_type_main-medium mb-8">{name}</p>

            <div className={`${ingredientDetailsStyles.composition} ${"mb-5"}`}>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">калории, ккал</p>
                    {calories}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">белки, г</p>
                    {proteins}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">жиры, г</p>
                    {fat}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <p className="mb-2">углеводы, г</p>
                    {carbohydrates}
                </div>
            </div>
        </div>
    );
}
