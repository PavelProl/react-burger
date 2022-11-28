import React from "react";
import constructorStyles from "./constructorStyles.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { normilizedBuns, normilizedSauce, normilizedFillings } from "../../utils/normalized-data";

export const BurgerConstructor = () => {
    return (
        <section className={constructorStyles.constructor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="mb-10">
                <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={normilizedBuns[0]["price"]}
                        thumbnail={normilizedBuns[0]["image"]}
                    />
                </div>
                <div className={constructorStyles.constructorElement_box}>
                    <div className="mr-2">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={normilizedSauce[1]["price"]}
                        thumbnail={normilizedSauce[1]["image"]}
                    />
                </div>
                <div className={constructorStyles.constructorElement_box}>
                    <div className="mr-2">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={normilizedFillings[2]["price"]}
                        thumbnail={normilizedFillings[2]["image"]}
                    />
                </div>
                <div className={constructorStyles.constructorElement_box}>
                    <div className="mr-2">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={normilizedFillings[3]["price"]}
                        thumbnail={normilizedFillings[3]["image"]}
                    />
                </div>
                <div className={constructorStyles.constructorElement_box}>
                    <div className="mr-2">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={normilizedFillings[4]["price"]}
                        thumbnail={normilizedFillings[4]["image"]}
                    />
                </div>
                <div className={constructorStyles.constructorElement_box}>
                    <div className="mr-2">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={normilizedFillings[4]["price"]}
                        thumbnail={normilizedFillings[4]["image"]}
                    />
                </div>
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
            <div className={`${constructorStyles.summary} ${"pr-4"}`}>
                <div className={`${constructorStyles.summary_price} ${"mr-10"}`}>
                    <p style={{display: 'inline-block'}} className="text text_type_digits-medium">610</p>
                    <div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    );
}
