import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderNumber } from "../../services/actions/order";
import orderDetailsStyles from "./order-details.module.css";
import Img from "../../images/done.png";

export const OrderDetails = () => {
    const selectedIngredients = useSelector(store => store.burgerConstructor.selectedIngredients);
    const orderNumber = useSelector(store => store.order.orderNumber);
    const orderRequest = useSelector(store => store.order.orderRequest);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderNumber(selectedIngredients));
    }, [dispatch]);

    return (
        <div className={`${orderDetailsStyles.orderDetails_content} ${"pt-4 mb-30"}`}>
            {orderRequest ? (
                <p className="text text_type_main-large mb-8">{"Загружаем..."}</p>
            ) : (
                <>
                    <p className="text text_type_digits-large mb-8">{orderNumber}</p>
                    <p className="text text_type_main-medium mb-15">
                        идентификатор заказа
                    </p>
                    <img className="mb-15" src={Img} alt="сделано." />
                    <p className="text text_type_main-default mb-2">
                        Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
};
