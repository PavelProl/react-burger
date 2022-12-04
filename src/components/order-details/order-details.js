import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from "./order-details.module.css";

export const OrderDetails = (props) => {
    return (
        <div className={`${orderDetailsStyles.modal} ${"pt-30 pb-30"}`}>
            <button className={`${orderDetailsStyles.button} ${"mt-15 mr-10"}`} onClick={props.handleClick}>
                <CloseIcon type="primary" />
            </button>
            <p className="text text_type_digits-large mb-8">034536</p>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <img className={orderDetailsStyles.done_img} src="./src/images/popup/done.png" alt="сделано." />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}
