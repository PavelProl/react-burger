import React, { useEffect } from "react";
import appStyles from "./app.module.css";
// COMPONENTS
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { OPEN_ORDER } from "../../services/actions/order";

export const App = () => {
    const dispatch = useDispatch();

    const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);
    const ingredientsFailed = useSelector(store => store.ingredients.ingredientsFailed);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const ingredientModalVisible = useSelector(store => store.currentIngredient.ingredientModalVisible);
    const orderModalVisible = useSelector(store => store.order.orderModalVisible);

    // позже удалю
    // const closeModal = () => {
    //     setState(prevState => {
    //         return {...prevState, ingredientModalVisible: false, orderModalVisible: false};
    //     })
    // };

    // открываем модальное окно
    // const handleOpenOrderModal = () => {
    //     dispatch({
    //         type: OPEN_ORDER
    //     });
    // };

    // получем ингредиенты запросом к API
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
        
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {orderModalVisible && (
                <Modal title="Оформление заказа">
                    <OrderDetails />
                </Modal>
            )}

            {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
            {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length && ingredientModalVisible && (
                <Modal title="Детали ингредиента">
                    <IngredientDetails />
                </Modal>
            )}

            {/* КОНТЕНТ СТРАНИЦЫ */}
            <AppHeader />
            <main className={`${appStyles.constructor} ${"mb-10"}`}>
                {ingredientsRequest && 'Загрузка...'}
                {ingredientsFailed && 'Обнаружена ошибка при загрузке данных...'}
                {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length &&
                    <>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </>
                }
            </main>
        </>
    );
};
