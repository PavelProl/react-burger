import React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerConstructorElement = ({ onDropHandler, ingredient, index }) => {
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredientId) {
            onDropHandler(ingredientId);
        }
    });

    return (
        <li className={`${burgerConstructorElementStyles.constructorElement_box} ${"mr-1"}`}>
            <div className={`${burgerConstructorElementStyles.cursor} ${"mr-2"}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                ref={dropTarget}
                text={ingredient.name}
                price={ingredient.price}
                type={ingredient.type}
                thumbnail={ingredient.image}
                handleClose={() =>
                    dispatch({
                        type: "DELETE_INGREDIENT",
                        payload: ingredient._id
                    })
                }
            />
        </li>
    );
};
