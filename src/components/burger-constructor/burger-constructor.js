import React, { useMemo } from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorElement } from "../burger-constructor-element/burger-constructor-element";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { OPEN_ORDER } from "../../services/actions/order";
import { ADD_INGREDIENT } from "../../services/actions/constructor";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(store => store.burgerConstructor.bun);
    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    console.log("bun", bun);
    console.log("selectedIngredients", selectedIngredients);

    const handleDrop = (id) => {
        const ingredient = ingredients.find(item => item._id === id);
        dispatch({
            type: ADD_INGREDIENT,
            payload: {
                type: ingredient.type,
                bun: ingredient,
                selectedIngredients: ingredient
            }
        });
    };

    const handleOpenOrderModal = () => {
        dispatch({
            type: OPEN_ORDER
        });
    };

    const finalPrice = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            (selectedIngredients.reduce((acc, item) => acc + item.price, 0))
        );
    }, [selectedIngredients, bun]);

    return (
        <section className={constructorStyles.constructor}>
            <div className={`${constructorStyles.constructor_container} ${"mb-10"}`}>

                {/* ВЕРХНЯЯ БУЛКА */}
                {bun && (
                    <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                        <ConstructorElement
                            isLocked={true}
                            text={`${bun.name}` + 'верх'}
                            price={bun.price}
                            type="top"
                            thumbnail={bun.image}
                        />
                    </div>
                )}


                {/* СКРОЛЛ-КОНТЕЙНЕР ИНГРЕДИЕНТОВ */}
                <ul className={constructorStyles.scroll_container}>
                    {selectedIngredients.map((ingredient, index) => {
                        return (
                            <BurgerConstructorElement
                                ingredient={ingredient}
                                index={index}
                                key={ingredient.id}
                                onDropHandler={handleDrop}
                            />
                        );
                    })}
                </ul>

                {/* НИЖНЯЯ БУЛКА */}
                {bun && (
                    <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                        <ConstructorElement
                            isLocked={true}
                            text={`${bun.name}` + 'низ'}
                            price={bun.price}
                            type="bottom"
                            thumbnail={bun.image}
                        />
                    </div>
                )}

            </div>

            {/* ИТОГОВАЯ СТОИМОСТЬ */}
            <div className={`${constructorStyles.summary} ${"pr-4"}`}>
                <div className={`${constructorStyles.price_container} ${"mr-10"}`}>
                    <p className={`${constructorStyles.price} ${"text text_type_digits-medium"}`}>
                        {finalPrice}
                    </p>
                    <div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => handleOpenOrderModal()}>
                        Оформить заказ
                </Button>
            </div>
            
        </section>
    );
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func
}
