import React from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import { DataContext, IdsContext } from "../../services/appContext";

export const App = () => {
    const [state, setState] = React.useState({
        orderModalVisible: false,
        ingredientModalVisible: false,
        isLoading: false,
        hasError: false,
        data: "",
        clickedIngredient: ""
    });

    const [ids, setIds] = React.useState([]);
    const [selectedIds, setSelectedIds] = React.useState([]);

    React.useEffect(() => {
        // ПОЛУЧАЕМ ДАННЫЕ ОБ ИНГРЕДИЕНТАХ С СЕРВЕРА
        setState({ ...state, isLoading: true, hasError: false});
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
                setState({...state, isLoading: false, hasError: false, data});
            })
            .catch(e => {
                console.log("error from catch", e);
                setState({...state, isLoading: false, hasError: true });
            })
    }, []);

    const closeModal = () => {
        setState(prevState => {
            return {...prevState, ingredientModalVisible: false, orderModalVisible: false};
        })
    }

    const handleOpenOrderModal = () => {
        setState({...state, orderModalVisible: true, ingredientModalVisible: false});
    }

    const handleOpenIngredientModal = (e, item) => {
        const clicked = state.data.data.find(ingredient => {
            return ingredient._id === item._id;
        })
        setState({...state, clickedIngredient: clicked, ingredientModalVisible: true, orderModalVisible: false});
    }

    // временный лог
    console.log("selectedIds from app.js", selectedIds);
    console.log("state.data from app.js", state.data);

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {state.orderModalVisible && (
                <Modal title="Оформление заказа" closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}

            {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
            {!state.isLoading && !state.hasError && state.data && state.data.data.length && state.ingredientModalVisible && (
                <Modal title="Детали ингредиента" closeModal={closeModal}>
                    <IngredientDetails
                        ingredient={state.clickedIngredient}
                    />
                </Modal>
            )}

            {/* КОНТЕНТ СТРАНИЦЫ */}
            <main>
                <AppHeader />
                <div className={`${appStyles.constructor} ${"mb-10"}`}>
                    {state.isLoading && 'Загрузка...'}
                    {state.hasError && 'Обнаружена ошибка при загрузке данных...'}
                    {!state.isLoading && !state.hasError && state.data && state.data.data.length &&
                        <DataContext.Provider value={state}>
                            <IdsContext.Provider value={{
                                ids,
                                setIds,
                                selectedIds,
                                setSelectedIds
                            }}>
                                <>
                                    <BurgerIngredients onClick={handleOpenIngredientModal} />
                                    <BurgerConstructor onClick={handleOpenOrderModal} />
                                </>
                            </IdsContext.Provider>
                        </DataContext.Provider>
                    }
                </div>
            </main>
        </>
    );
}
