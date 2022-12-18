import React, { useState, useEffect } from "react";
import appStyles from "./app.module.css";
// COMPONENTS
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";
// CONTEXTS
import { DataContext, IdsContext, PriceContext, BunsContext } from "../../services/appContext";
// CONSTANT
import { BASE_URL, request } from "../../utils/constants";

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
        // получаем данные об ингредиентах с сервера
        setState({ ...state, isLoading: true, hasError: false});
        request(`${BASE_URL}ingredients`) // универсальная функция запроса с проверкой ответа
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
    };

    // открываем модальное окно &&
    // отравляем POST запрос на сервер с данными по ингредиентам
    const handleOpenOrderModal = () => {
        if (selectedIngredients.length === 0) {
            // не даем оформить заказ, если нет ингредиентов
            return;
        } else {
            setState({ ...state, isLoading: true, hasError: false});
            request(`${BASE_URL}orders`, { // универсальная функция запроса с проверкой ответа
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({"ingredients": selectedIngredients})
            })
            .then(data => {
                setOrderNumber(data.order.number);
                setState({...state, orderModalVisible: true, ingredientModalVisible: false}); 
                
                // очищаем конструктор для нового заказа
                setSelectedIngredients([]);
                setSelectedIds([]);
                setBuns([]);
            })
            .catch(e => {
                console.log("error from catch", e);
                setState({...state, isLoading: false, hasError: true });
            })
        }
    };

    const handleOpenIngredientModal = (e, item) => {
        const clicked = data.find(ingredient => {
            return ingredient._id === item._id;
        });
        setState({...state, clickedIngredient: clicked, ingredientModalVisible: true, orderModalVisible: false});

        // кладем булки в стэйт
        setBuns((buns) => {
            if (clicked.type === "bun" && buns.length === 0) {
                return [...buns, clicked];
            } else {
                return [...buns];
            }
        })
    };

    // console.log(selectedIngredients);

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {state.orderModalVisible && (
                <Modal title="Оформление заказа" closeModal={closeModal}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
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
            <AppHeader />
            <main className={`${appStyles.constructor} ${"mb-10"}`}>
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
            </main>
        </>
    );
};
