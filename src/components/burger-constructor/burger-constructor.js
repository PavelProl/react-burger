import React, { useContext } from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IdsContext, DataContext, PriceContext, BunsContext } from "../../services/appContext";

import PropTypes from "prop-types";

export const BurgerConstructor = (props) => {

    // получаю массив выбранных ids и данные из контекста 
    const { selectedIds } = useContext(IdsContext);
    const { data } = useContext(DataContext);
    const { finalPrice } = useContext(PriceContext);
    const { buns } = useContext(BunsContext);

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
                                <div key={index} className={constructorStyles.constructorElement_box}>
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
                <Button htmlType="button" type="primary" size="large" onClick={() => {
                    props.onClick();
                }}>
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    );
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func
}
