// React, Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// DnD
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Router
import { Route, Routes, useLocation, useNavigate, useMatch } from "react-router-dom";

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
import { FeedPage } from "../../pages/feed-page";
import { NotFound404 } from "../../pages/not-found-404";
import ProtectedRoute from "../protected-route/protected-route";

import appStyles from "./app.module.css";
import { checkUserAuth } from "../../services/actions/user";

export const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background;

    const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);
    const ingredientsFailed = useSelector(store => store.ingredients.ingredientsFailed);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const ingredientModalVisible = useSelector(store => store.currentIngredient.ingredientModalVisible);
    const orderModalVisible = useSelector(store => store.order.orderModalVisible);

    // получем ингредиенты запросом к API
    useEffect(() => {
        dispatch(getIngredients());

    // проверяем, авторизован ли пользователь
        dispatch(checkUserAuth());
    }, [dispatch]);

    const closeModal = () => {
        if (ingredientModalVisible) {
            dispatch(closeIngredient())
        }
        navigate("/");
        if (orderModalVisible) {
            dispatch(closeOrder())
        }
    };

    if (ingredientsRequest) {
        return <p>Загрузка...</p>;
    }
    
    if (ingredientsFailed || ingredients.length === 0) {
        return <p>Обнаружена ошибка при загрузке данных...</p>;
    }

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {orderModalVisible && (
                <Modal title="Оформление заказа" closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}

            {/* КОНТЕНТ СТРАНИЦЫ */}
            <AppHeader />
            <main className="mb-10">
                <div className={appStyles.wrapper}>
                    <Routes location={background || location}>

                        // --- LOGIN
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute onlyUnAuth={true}>
                                    <LoginPage />
                                </ProtectedRoute>
                            }
                        />

                        // --- REGISTER
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute onlyUnAuth={true}>
                                    <RegisterPage />
                                </ProtectedRoute>
                            }
                        />
                        
                        // --- FORGOT-PASSWORD
                        <Route
                            path="/forgot-password"
                            element={
                                <ProtectedRoute onlyUnAuth={true}>
                                    <ForgotPasswordPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/reset-password"
                            element={
                                <ProtectedRoute onlyUnAuth={true}>
                                    <ResetPasswordPage />
                                </ProtectedRoute>
                            }
                        />

                        // --- PROFILE
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />

                        // --- MAIN
                        <Route
                            path="/"
                            element={
                                <DndProvider backend={HTML5Backend}>
                                <div className={appStyles.ingredientsConstructorContainer}>
                                  <BurgerIngredients />
                                  <BurgerConstructor />
                                </div>
                              </DndProvider>
                        } />

                        // --- FEED
                        <Route path="/feed" element={<FeedPage />} />

                        // ---- INGREDIENT DETAILS
                        <Route path="/ingredients/:id" element={<IngredientDetails />} />

                        // --- 404
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>

                    {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
                    {background && (
                        <Routes>
                            <Route
                                path="/ingredients/:id"
                                element={
                                    <Modal title="Детали ингредиента" closeModal={closeModal}>
                                        <IngredientDetails />
                                    </Modal>
                                }
                                />
                      </Routes>
                    )}

                </div>
            </main>  
        </>
    );
};
