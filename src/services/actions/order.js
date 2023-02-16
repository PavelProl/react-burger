import { BASE_URL, request } from "../../utils/api";

export const OPEN_ORDER = "OPEN_ORDER";
export const CLOSE_ORDER = "CLOSE_ORDER";
export const CALCULATE_PRICE = "CALCULATE_PRICE";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const getOrderNumber = (selectedIngredients) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        request(`${BASE_URL}orders`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({"ingredients": selectedIngredients})
        })
        .then(res => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                orderNumber: res.order.number
            });
            dispatch({
                type: CLEAR_CONSTRUCTOR
            });
        })
        .catch(e => {
            console.log("error from catch", e);
            dispatch({
                type: GET_ORDER_FAILED
            });
        })
    }
};

export function closeOrder() {
    return {
        type: CLOSE_ORDER
    }
};

export function openOrder() {
    return {
        type: OPEN_ORDER
    }
};

