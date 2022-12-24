import React, { useMemo } from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { OPEN_ORDER } from "../../services/actions/order";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(store => store.burgerConstructor.bun);
    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);
    // const finalPrice = useSelector(store => store.order.finalPrice);
    console.log("bun", bun);
    console.log("selectedIngredients", selectedIngredients);

    const handleOpenOrderModal = () => {
        dispatch({
            type: OPEN_ORDER
        });
    };

    // вариант расчета с useEffect пока оставил
    // useEffect(
    //     () => {
    //       let total = 0;
    //         selectedIngredients.map(item => (total += item["price"]));
    //         if (bun) {
    //             total += (bun.price * 2);
    //         }
    //       dispatch({
    //         type: CALCULATE_PRICE,
    //         finalPrice: total
    //       });
    //     },
    //     [selectedIngredients, bun]
    // );

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
                <div className={constructorStyles.scroll_container}>
                    {selectedIngredients.map((ingredient, index) => {
                            return (
                                <div key={index} className={`${constructorStyles.constructorElement_box} ${"mr-1"}`}>
                                    <div className={`${constructorStyles.cursor} ${"mr-2"}`}>
                                        <DragIcon type="primary" />
                                    </div>
                                    <ConstructorElement
                                        key={ingredient._id}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        type={ingredient.type}
                                        thumbnail={ingredient.image}
                                    />
                                </div>
                            );
                        // }
                    })}
                </div>

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
