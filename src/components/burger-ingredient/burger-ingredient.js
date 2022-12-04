import React from "react";
import ingredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

export const Ingredient = (props) => {
    return (
        <li onClick={props.onClick} className={ingredientStyles.list_item}>
            
            {/* временное решение с условным рендером */}
            {props.checked && <Counter count={1} size="default" extraClass="m-1" />}
            <button className={ingredientStyles.ingredient_button}>
                <img src={props.image} alt={props.name} />
            </button>
            <div className={`${ingredientStyles.price} ${"pt-1 pb-1"}`}>
                <p className="text text_type_digits-default mr-2">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-8">{props.name}</p>
        </li>
    );
}

Ingredient.propTypes = {
    checked: PropTypes.bool,
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string
};
