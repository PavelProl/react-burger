import React, { useEffect } from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { CALCULATE_PRICE, OPEN_ORDER } from "../../services/actions/order";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.ingredients.ingredients);
    const selectedIds = useSelector(store => store.burgerConstructor.selectedIds);
    const buns = useSelector(store => store.burgerConstructor.buns);

    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);
    const finalPrice = useSelector(store => store.order.finalPrice);

    const handleOpenOrderModal = () => {
        dispatch({
            type: OPEN_ORDER
        });
    };

    useEffect(
        () => {
          let total = 0;
          selectedIngredients.map(item => (total += item["price"]));
          dispatch({
            type: CALCULATE_PRICE,
            finalPrice: total
          });
        },
        [selectedIngredients]
    );

    return (
        <section className={constructorStyles.constructor}>
            <div className={`${constructorStyles.constructor_container} ${"mb-10"}`}>

                {/* ВЕРХНЯЯ БУЛКА */}
                {!!buns.length && (
                    <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                        <ConstructorElement
                            isLocked={true}
                            text={`${buns[0].name}` + 'верх'}
                            price={buns[0].price}
                            type="top"
                            thumbnail={buns[0].image}
                        />
                    </div>
                )}


                {/* СКРОЛЛ-КОНТЕЙНЕР ИНГРЕДИЕНТОВ */}
                <div className={constructorStyles.scroll_container}>
                    {selectedIds.map((id, index) => {

                        // находим ингредиент по id
                        const ingredient = data.find(item => item._id === id);

                        if (ingredient.type !== "bun") {
                        // рендерим найденный ингредиент между БУЛОК
                            return (
                                <div key={index} className={`${constructorStyles.constructorElement_box} ${"mr-1"}`}>
                                    <div className={`${constructorStyles.cursor} ${"mr-2"}`}>
                                        <DragIcon type="primary" />
                                    </div>
                                    <ConstructorElement
                                        key={id}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        type={ingredient.type}
                                        thumbnail={ingredient.image}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                {/* НИЖНЯЯ БУЛКА */}
                {!!buns.length && (
                    <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                        <ConstructorElement
                            isLocked={true}
                            text={`${buns[0].name}` + 'низ'}
                            price={buns[0].price}
                            type="bottom"
                            thumbnail={buns[0].image}
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
