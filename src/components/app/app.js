import React from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details"; 
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { data } from "../../utils/data";

// переключает у body overflow
// чтобы не было прокрутки под модальным окном
function toggleBodyOverflow(modalVisible) {
    document.querySelector('body').classList.toggle('overflow', modalVisible);
}

export const App = () => {
    const [state, setState] = React.useState({
        modalVisible: false,
        orderModalVisible: false,
        ingredientModalVisible: false,
        isLoading: false,
        hasError: false,
        data: "",
        clickedIngredient: ""
    });

    React.useEffect(() => {
        toggleBodyOverflow(state.modalVisible)
    }, [state.modalVisible]);

    React.useEffect(() => {
        // ПОЛУЧАЕМ ДАННЫЕ ОБ ИНГРЕДИЕНТАХ С СЕРВЕРА
        const getData = async () => {
            try {
                setState({ ...state, isLoading: true, hasError: false});
                const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
                const data = await res.json();
                setState({ isLoading: false, hasError: false, data: data });
            } catch {
                setState({ ...state, isLoading: false, hasError: true });
            }
        }

        getData();
    }, []);

    const handleCloseModal = () => {
        setState({...state, modalVisible: false, ingredientModalVisible: false, orderModalVisible: false});
    }

    const handleOpenOrderModal = () => {
        setState({...state, orderModalVisible: true, modalVisible: true});
    }

    const handleOpenIngredientModal = (e, item) => {
        const clicked = state.data.data.find(ingredient => {
            return ingredient._id === item._id;
        })
        setState({...state, clickedIngredient: clicked, ingredientModalVisible: true, modalVisible: true});
    }

    return (
        <>
            {/* МОДАЛЬНОЕ ОКНО */}
            {state.orderModalVisible && (
                <Modal handleOverlayClick={handleCloseModal}>
                    <OrderDetails handleClick={handleCloseModal} />
                </Modal>
            )}
            
            {!state.isLoading && !state.hasError && state.data && state.data.data.length && state.ingredientModalVisible && (
                <Modal handleOverlayClick={handleCloseModal}>
                    <IngredientDetails
                        name={state.clickedIngredient.name}
                        image={state.clickedIngredient.image_large}
                        calories={state.clickedIngredient.calories}
                        proteins={state.clickedIngredient.proteins}
                        fat={state.clickedIngredient.fat}
                        carbohydrates={state.clickedIngredient.carbohydrates}
                        handleClick={handleCloseModal} />
                </Modal>
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
