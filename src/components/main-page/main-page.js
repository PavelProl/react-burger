// React, Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// DnD
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Services
import { getIngredients } from "../../services/actions/ingredients";
import { closeIngredient } from "../../services/actions/currentIngredient";
import { closeOrder } from "../../services/actions/order";

// Компоненты
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { LoginPage } from "../../pages/login-page";
import { Register } from "../../pages/register-page";
import { ForgotPassword } from "../../pages/forgot-password-page";
import { ResetPassword } from "../../pages/reset-password-page";

import appStyles from "../../components/app/app.module.css";

export const MainPage = () => {
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
            {/* <AppHeader /> */}

                <DndProvider backend={HTML5Backend}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Обнаружена ошибка при загрузке данных...'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length &&
                        <>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </>
                    }
                </DndProvider>

        </>
    );
}