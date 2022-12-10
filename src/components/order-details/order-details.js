import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from "./order-details.module.css";
import Img from "../../images/done.png";

export const OrderDetails = () => {
    return (
        <div className={`${orderDetailsStyles.orderDetails_content} ${"pt-4 mb-30"}`}>
            <p className="text text_type_digits-large mb-8">034536</p>
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
        </div>
    );
}

