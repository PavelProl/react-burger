import React, { useMemo } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { addIngredientToConstructorAction } from "../../services/actions/constructor";
import { openOrderAction } from "../../services/actions/order";
import constructorStyles from "./constructorStyles.module.css";

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorElement } from "../burger-constructor-element/burger-constructor-element";
import { TIngredient } from "../../services/types/data";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bun = useSelector((store: any) => store.burgerConstructor.bun);
    const selectedIngredients = useSelector((store: any) => store.burgerConstructor.selectedIngredients);
    const user = useSelector((store: any) => store.user.data);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item: TIngredient) => {
            return dispatch(addIngredientToConstructorAction(item))
        }
    });

    const handleOpenOrderModal = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (!bun) {
            return;
        };
        dispatch(openOrderAction());
    };

    const finalPrice = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            (selectedIngredients.reduce((acc: number, item: TIngredient) => acc + item.price, 0))
        );
    }, [selectedIngredients, bun]);

    return (
        <section ref={dropTarget} className={"pt-15 pl-4 pr-4"}>
            <div className={`${constructorStyles.constructor_container} ${"mb-10"}`}>

                {/* ВЕРХНЯЯ БУЛКА */}
                {bun ? (
                    <div className={`${constructorStyles.constructorElement_box} ${"ml-8"}`}>
                        <ConstructorElement
                            isLocked={true}
                            text={`${bun.name}` + 'верх'}
                            price={bun.price}
                            type="top"
                            thumbnail={bun.image}
                        />
                    </div>
                ) : (
                    <div>
                        <h2>Выберите булки</h2>
                    </div>
                )}


                {/* СКРОЛЛ-КОНТЕЙНЕР ИНГРЕДИЕНТОВ */}
                <ul className={constructorStyles.scroll_container}>
                    {selectedIngredients.length > 0 && selectedIngredients.map((ingredient: TIngredient, index: number) => {
                        return (
                            <BurgerConstructorElement
                                ingredient={ingredient}
                                index={index}
                                key={ingredient.id}
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
                <Link to="/login">
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => handleOpenOrderModal()}>
                            Оформить заказ
                    </Button>
                </Link>
                
            </div>
            
        </section>
    );
}
