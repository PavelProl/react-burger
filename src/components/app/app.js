// React, Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// DnD
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Router
import { Route, Routes } from "react-router-dom";

// Services
import { getIngredients } from "../../services/actions/ingredients";
import { closeIngredient } from "../../services/actions/currentIngredient";
import { closeOrder } from "../../services/actions/order";

// // Компоненты
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { LoginPage } from "../../pages/login-page";
import { RegisterPage } from "../../pages/register-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page";
import { ProfilePage } from "../../pages/profile-page";
import ProtectedRoute from "../protected-route/protected-route";

import appStyles from "./app.module.css";
import { checkUserAuth } from "../../services/actions/user";

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

    // проверяем, авторизован ли пользователь (делаем запрос на сервер и проверяем, есть ли токен в хранилище)
        dispatch(checkUserAuth());
    }, [dispatch]);

    const closeModal = () => {
        if (ingredientModalVisible) {
            dispatch(closeIngredient())
        }
        if (orderModalVisible) {
            dispatch(closeOrder())
        }
    };

    // тестовый лог
    const user = useSelector(store => store.user);
    console.log("user from app", user);

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
            <main className="mb-10">
                <div className={appStyles.wrapper}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute redirectTo={"/"}>
                                    <RegisterPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route
                            path="/reset-password"
                            element={
                                <ProtectedRoute>
                                    <ResetPasswordPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={
                            <ProtectedRoute redirectTo={"/login"}>
                                <DndProvider backend={HTML5Backend}>
                                    {ingredientsRequest && 'Загрузка...'}
                                    {ingredientsFailed && 'Обнаружена ошибка при загрузке данных...'}
                                    {!ingredientsRequest && !ingredientsFailed && ingredients && ingredients.length &&
                                        <div className={appStyles.ingredientsConstructorContainer}>
                                            <BurgerIngredients />
                                            <BurgerConstructor />
                                        </div>
                                    }
                                </DndProvider>
                            </ProtectedRoute>

                        } />
                    </Routes>
                </div>
            </main>  
        </>
    );
};
