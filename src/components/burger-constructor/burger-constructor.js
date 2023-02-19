import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { addIngredientToConstructor } from "../../services/actions/constructor";
import { openOrder } from "../../services/actions/order";
import constructorStyles from "./constructorStyles.module.css";

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorElement } from "../burger-constructor-element/burger-constructor-element";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    // const location = useLocation();
    const navigate = useNavigate();
    const bun = useSelector(store => store.burgerConstructor.bun);
    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);
    const user = useSelector(store => store.user.data);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: item => {
            return dispatch(addIngredientToConstructor(item))
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
        dispatch(openOrder());
    };

    const finalPrice = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            (selectedIngredients.reduce((acc, item) => acc + item.price, 0))
        );
    }, [selectedIngredients, bun]);

    return (
        <section ref={dropTarget} className={constructorStyles.constructor}>
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
                    {selectedIngredients.length > 0 && selectedIngredients.map((ingredient, index) => {
                        return (
                            <BurgerConstructorElement
                                ingredient={ingredient}
                                index={index}
                                key={ingredient.id}
                                id={ingredient.id}
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

// BurgerConstructor.propTypes = {
//     onClick: PropTypes.func
// }
