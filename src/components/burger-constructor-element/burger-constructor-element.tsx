import React, {useRef, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { REORDER_INGREDIENTS, DELETE_INGREDIENT } from "../../services/constants/constructor";
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient } from "../burger-ingredient/burger-ingredient";

interface IBurgerConstructorElementProps {
    ingredient: IIngredient;
    index: number;
}

export const BurgerConstructorElement: FunctionComponent<IBurgerConstructorElementProps> = ({ ingredient, index }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: "sort_ingredient",
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (hoverIndex === dragIndex) return;
            
            dispatch({
                type: REORDER_INGREDIENTS,
                payload: {
                    insertFrom: dragIndex,
                    insertTo: hoverIndex
                }
            });
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: "sort_ingredient",
        item: () => {
            return {ingredient, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1
    drag(drop(ref));

    return (
        <li
            style={{ opacity }}
            ref={ref}
            data-handler-id={handlerId}
            className={`${burgerConstructorElementStyles.constructorElement_box} ${"mr-1"}`}
        >
            <div className={`${burgerConstructorElementStyles.cursor} ${"mr-2"}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                // type={ingredient.type}
                thumbnail={ingredient.image}
                handleClose={() =>
                    dispatch({
                        type: DELETE_INGREDIENT,
                        payload: ingredient.id
                    })
                }
            />
        </li>
    );
};
