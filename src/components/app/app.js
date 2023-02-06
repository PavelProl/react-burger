import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import appStyles from "./app.module.css";

import { closeIngredient } from "../../services/actions/currentIngredient";
import { closeOrder } from "../../services/actions/order";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";

export const App = () => {
    const dispatch = useDispatch();

    const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);
    const ingredientsFailed = useSelector(store => store.ingredients.ingredientsFailed);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const ingredientModalVisible = useSelector(store => store.currentIngredient.ingredientModalVisible);
    const orderModalVisible = useSelector(store => store.order.orderModalVisible);

    // получем ингредиенты запросом к API
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const closeModal = () => {
        if (ingredientModalVisible) {
            dispatch(closeIngredient())
        }
        if (orderModalVisible) {
            dispatch(closeOrder())
        }
    };

    return (
        <>
        
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {orderModalVisible && (
                <Modal title="Оформление заказа" closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}

            {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
            {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length && ingredientModalVisible && (
                <Modal title="Детали ингредиента" closeModal={closeModal}>
                    <IngredientDetails />
                </Modal>
            )}

            {/* КОНТЕНТ СТРАНИЦЫ */}
            <AppHeader />
            <main className={`${appStyles.constructor} ${"mb-10"}`}>
                <Login />
                {/* <Register /> */}
                {/* <ForgotPassword /> */}
                {/* <ResetPassword /> */}
                {/* <DndProvider backend={HTML5Backend}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Обнаружена ошибка при загрузке данных...'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length &&
                        <>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </>
                    }
                </DndProvider> */}
            </main>
        </>
    );
};
