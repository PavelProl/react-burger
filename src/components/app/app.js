import React from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const App = () => {
    const [state, setState] = React.useState({
        modalVisible: true,
        orderModalVisible: false,
        ingredientModalVisible: false,
        isLoading: false,
        hasError: false,
        data: "",
        clickedIngredient: ""
    });

    React.useEffect(() => {
        // ПОЛУЧАЕМ ДАННЫЕ ОБ ИНГРЕДИЕНТАХ С СЕРВЕРА
        const getData = async () => {
            try {
                setState({ ...state, isLoading: true, hasError: false});
                const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
                if (res.ok) {
                    const data = await res.json();
                    setState({ isLoading: false, hasError: false, data: data });
                }
            } catch(e) {
                console.log("error -->", e);
                setState({ ...state, isLoading: false, hasError: true });
            }
        }

        getData();
    }, []);

    const handleCloseModal = () => {
        setState({...state, modalVisible: false, ingredientModalVisible: false, orderModalVisible: false});
    }

    // код handleEscCloseModal в работе...
    const handleEscCloseModal = (e) => {
        if (e.keyCode == 27) {
            setState({...state, modalVisible: false, ingredientModalVisible: false, orderModalVisible: false});
        }
    }

    const handleOpenOrderModal = () => {
        setState({...state, modalVisible: true, orderModalVisible: true, modalVisible: true});
    }

    const handleOpenIngredientModal = (e, item) => {
        const clicked = state.data.data.find(ingredient => {
            return ingredient._id === item._id;
        })
        setState({...state, clickedIngredient: clicked, ingredientModalVisible: true, modalVisible: true});
    }

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {state.orderModalVisible && state.modalVisible && (
                <ModalOverlay closeModal={handleCloseModal}>
                    <Modal onKeyDown={handleEscCloseModal} title="Оформление заказа" closeModal={handleCloseModal}>
                        <OrderDetails />
                    </Modal>
                </ModalOverlay>
            )}

            {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
            {!state.isLoading && !state.hasError && state.data && state.data.data.length && state.ingredientModalVisible && (
                <ModalOverlay closeModal={handleCloseModal}>
                    <Modal onKeyDown={handleEscCloseModal} title="Детали ингредиента" closeModal={handleCloseModal}>
                        <IngredientDetails
                            name={state.clickedIngredient.name}
                            image={state.clickedIngredient.image_large}
                            calories={state.clickedIngredient.calories}
                            proteins={state.clickedIngredient.proteins}
                            fat={state.clickedIngredient.fat}
                            carbohydrates={state.clickedIngredient.carbohydrates}
                        />
                    </Modal>
                </ModalOverlay>
            )}

            {/* КОНТЕНТ СТРАНИЦЫ */}
            <AppHeader />
            <div className={`${appStyles.constructor} ${"mb-10"}`}>
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Обнаружена ошибка при загрузке данных...'}
                {!state.isLoading && !state.hasError && state.data && state.data.data.length &&
                    <>
                        <BurgerIngredients data={state.data} onClick={handleOpenIngredientModal} />
                        <BurgerConstructor onClick={handleOpenOrderModal} />
                    </>
                }
            </div>
        </>
    );
}
