import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { REORDER_INGREDIENTS } from "../../services/actions/constructor";

export const BurgerConstructorElement = ({ ingredient, index }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "sort_ingredient",
        hover(item, monitor) {
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

    const [, drag] = useDrag({
        type: "sort_ingredient",
        item: () => {
            return {ingredient, index}
        }
    });

    drag(drop(ref));

    return (
        <li ref={ref} className={`${burgerConstructorElementStyles.constructorElement_box} ${"mr-1"}`}>
            <div className={`${burgerConstructorElementStyles.cursor} ${"mr-2"}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                type={ingredient.type}
                thumbnail={ingredient.image}
                handleClose={() =>
                    dispatch({
                        type: "DELETE_INGREDIENT",
                        payload: ingredient.id
                    })
                }
            />
        </li>
    );
};
