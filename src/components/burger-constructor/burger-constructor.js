import React, { useContext } from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { normilizedBuns, normilizedSauce, normilizedFillings } from "../../utils/normalized-data";

import { IdsContext, DataContext } from "../../services/appContext";

import PropTypes from "prop-types";

export const BurgerConstructor = (props) => {

    // получаю массив выбранных ids и данные из контекста 
    const { selectedIds } = useContext(IdsContext);
    const { data } = useContext(DataContext);
    // временный лог
    console.log("selectedIds from constructor", selectedIds);

    return (
        <section className={constructorStyles.constructor}>
            <div className={`${constructorStyles.constructor_container} ${"mb-10"}`}>

                {/* ВЕРХНЯЯ БУЛКА */}
                <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={normilizedBuns[0]["price"]}
                        thumbnail={normilizedBuns[0]["image"]}
                    />
                </div>

                {/* скролл-контэйнер ингредиентов */}
                <div className={constructorStyles.scroll_container}>
                    {selectedIds.map((id, index) => {

                        // находим ингредиент по id
                        const ingredient = data.data.find(item => item._id === id);
                        console.log("ingredient", ingredient);

                        // рендерим найденный ингредиент между БУЛОК
                        return (
                            <div key={index} className={constructorStyles.constructorElement_box}>
                                <div className={`${constructorStyles.cursor} ${"mr-2"}`}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                    key={id}
                                    text={ingredient["name"]}
                                    price={ingredient["price"]}
                                    thumbnail={ingredient["image"]}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* НИЖНЯЯ БУЛКА */}
                <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={normilizedBuns[0]["price"]}
                        thumbnail={normilizedBuns[0]["image"]}
                    />
                </div>
            </div>

            {/* ИТОГОВАЯ СТОИМОСТЬ */}
            <div className={`${constructorStyles.summary} ${"pr-4"}`}>
                <div className={`${constructorStyles.price_container} ${"mr-10"}`}>
                    <p className={`${constructorStyles.price} ${"text text_type_digits-medium"}`}>610</p>
                    <div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button onClick={props.onClick} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    );
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func
}
