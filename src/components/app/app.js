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
import { IdsContext, PriceContext, BunsContext } from "../../services/appContext";
// CONSTANT
import { BASE_URL, request } from "../../utils/constants";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { OPEN_INGREDIENT } from "../../services/actions/currentIngredient";
import { OPEN_ORDER } from "../../services/actions/order";

export const App = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        // orderModalVisible: false,
        // ingredientModalVisible: false,
        // clickedIngredient: "",
        orderNumber: 0
    });

    const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);
    const ingredientsFailed = useSelector(store => store.ingredients.ingredientsFailed);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);
    const ingredientModalVisible = useSelector(store => store.currentIngredient.ingredientModalVisible);
    const orderModalVisible = useSelector(store => store.order.orderModalVisible);
    // const selectedIngredients = useSelector(store => selectedIngredients.selectedIngredients);

    const [ids, setIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [buns, setBuns] = useState([]);
    const [orderNumber, setOrderNumber] = useState();

    // позже удалю
    // const closeModal = () => {
    //     setState(prevState => {
    //         return {...prevState, ingredientModalVisible: false, orderModalVisible: false};
    //     })
    // };

    // открываем модальное окно &&
    // отравляем POST запрос на сервер с данными по ингредиентам
    const handleOpenOrderModal = () => {
        dispatch({
            type: OPEN_ORDER
        })
        /*
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
        */
    };

    const handleOpenIngredientModal = (e, item) => {
        const clicked = ingredients.find(ingredient => {
            return ingredient._id === item._id;
        });
        dispatch({
            type: OPEN_INGREDIENT,
            ingredientModalVisible: true,
        });

        // кладем булки в стэйт
        setBuns((buns) => {
            if (clicked.type === "bun" && buns.length === 0) {
                return [...buns, clicked];
            } else {
                return [...buns];
            }
        })
    };

    // получем ингредиенты запросом к API
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
        
            {/* МОДАЛЬНОЕ ОКНО C ОБЩИМ ЗАКАЗОМ */}
            {orderModalVisible && (
                <Modal title="Оформление заказа">
                    <OrderDetails orderNumber={orderNumber} />
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
                    <PriceContext.Provider value={{finalPrice, setFinalPrice}}>
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
                    </PriceContext.Provider>
                }
            </main>
        </>
    );
};
