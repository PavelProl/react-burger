import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";

import PropTypes from "prop-types";

export const IngredientDetails = (props) => {
    return (
        <div className={`${ingredientDetailsStyles.ingredientDetails_content} ${"mb-15"}`}>
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

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
};
