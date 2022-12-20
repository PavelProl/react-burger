import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
    const ingredient = useSelector(store => store.currentIngredient.currentIngredient);
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

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number
      }),
};
