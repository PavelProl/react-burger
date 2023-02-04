import React from "react";
import ingredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

export const Ingredient = (props) => {
    const { count, item } = props;
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: () => item
    });
    
    return (
        <li
            className={ingredientStyles.list_item}
            onClick={props.onIngredientClick}
            ref={dragRef}
        >
            {count && <Counter count={count} size="default" extraClass="m-1" />}
            <button className={ingredientStyles.ingredient_button}>
                <img src={item.image} alt={item.name} />
            </button>
            <div className={`${ingredientStyles.price} ${"pt-1 pb-1"}`}>
                <p className="text text_type_digits-default mr-2">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-8">{item.name}</p>
        </li>
    );
}

Ingredient.propTypes = {
    count: PropTypes.number,
    item: PropTypes.object.isRequired
};
