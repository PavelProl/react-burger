import React, { useState } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import { DataContext, IdsContext, PriceContext, BunsContext, OrderContext } from "../../services/appContext";

export const App = () => {
    const [state, setState] = useState({
        orderModalVisible: false,
        ingredientModalVisible: false,
        isLoading: false,
        hasError: false,
        clickedIngredient: "",
        orderNumber: 0
    });

    const [data, setData] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [ids, setIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [buns, setBuns] = useState([]);
    const [orderNumber, setOrderNumber] = useState();

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
                setState({...state, isLoading: false, hasError: false});
                setData([...data.data])
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
        setState({ ...state, isLoading: true, hasError: false});
        fetch("https://norma.nomoreparties.space/api/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({"ingredients": selectedIngredients})
        })
        .then(response => response.json())
        .then(data => {
            console.log("data from POST", data);
            setOrderNumber(data.order.number);
            setState({...state, orderModalVisible: true, ingredientModalVisible: false});
        })
        .catch(err => console.log("error from POST", err))
    }

    const handleOpenIngredientModal = (e, item) => {
        const clicked = data.find(ingredient => {
            return ingredient._id === item._id;
        });
        setState({...state, clickedIngredient: clicked, ingredientModalVisible: true, orderModalVisible: false});

        // кладу булки в стэйт
        setBuns((buns) => {
            if (clicked.type === "bun" && buns.length === 0) {
                return [...buns, clicked];
            } else {
                return [...buns];
            }
        })
    }

    // временный лог
    // console.log("selectedIds from app.js", selectedIds);
    // console.log("data from app.js", data);
    // console.log("buns from app", buns);

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {state.orderModalVisible && (
                <OrderContext.Provider value={orderNumber}>
                    <Modal title="Оформление заказа" closeModal={closeModal}>
                        <OrderDetails />
                    </Modal>
                </OrderContext.Provider>

            )}

            {/* МОДАЛЬНОЕ ОКНО C КАРТОЧКОЙ ИНГРЕДИЕНТА */}
            {!state.isLoading && !state.hasError && data && data.length && state.ingredientModalVisible && (
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
                    {!state.isLoading && !state.hasError && data && data.length &&
                    <PriceContext.Provider value={{finalPrice, setFinalPrice}}>
                        <DataContext.Provider value={{
                            data,
                            setData,
                            selectedIngredients,
                            setSelectedIngredients
                            }}>
                            <IdsContext.Provider value={{
                                ids,
                                setIds,
                                selectedIds,
                                setSelectedIds
                            }}>
                                <BunsContext.Provider value={{buns, setBuns}}>
                                    <>
                                        <BurgerIngredients onClick={handleOpenIngredientModal} />
                                        <BurgerConstructor onClick={handleOpenOrderModal} />
                                    </>
                                </BunsContext.Provider>
                            </IdsContext.Provider>
                        </DataContext.Provider>
                    </PriceContext.Provider>
                        
                    }
                </div>
            </main>
        </>
    );
}
