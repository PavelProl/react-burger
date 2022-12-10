import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";

import PropTypes from "prop-types";

export const IngredientDetails = ({ingredient}) => {
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

// IngredientDetails.propTypes = {
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     calories: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired
// };
