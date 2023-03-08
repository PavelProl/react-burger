// import { BASE_URL, fetchWithRefresh } from "../../utils/api";
import {
    OPEN_ORDER,
    CLOSE_ORDER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from "../constants/constants";
import { TData, TOrderNumber } from "../types/data";
import { getOrderNumberApi } from "../../utils/api";
import { clearConstructorAction } from "./constructor";

export interface IOpenOrderAction {
    readonly type: typeof OPEN_ORDER;
}

export interface ICloseOrderAction {
    readonly type: typeof CLOSE_ORDER;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    orderNumber: TOrderNumber
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export type IGetOrderActions =
    | IGetOrderRequestAction
    |IGetOrderSuccessAction
    |IGetOrderFailedAction
;

export const getOrderRequestAction = (): IGetOrderRequestAction => {
    return {
        type: GET_ORDER_REQUEST
    }
};

export const getOrderSuccessAction = (orderNumber: TOrderNumber): IGetOrderSuccessAction => {
    return {
        type: GET_ORDER_SUCCESS,
        orderNumber
    }
};

export const getOrderFailedAction = (): IGetOrderFailedAction => {
    return {
        type: GET_ORDER_FAILED
    }
};

export const closeOrderAction = (): ICloseOrderAction => {
    return {
        type: CLOSE_ORDER
    }
};

export const openOrderAction = (): IOpenOrderAction => {
    return {
        type: OPEN_ORDER
    }
};

export const getOrderNumber = (selectedIngredients: TData[]) => {
    return function(dispatch: any) {
        dispatch(getOrderRequestAction())
        getOrderNumberApi(selectedIngredients)
            .then((data: any) => {
                if (data?.success) return data;
                return Promise.reject(data);
            })
            .then((res) => {
                dispatch(getOrderSuccessAction(res.order.number));
                dispatch(clearConstructorAction());
            })
            .catch((e) => {
                console.log("error from catch", e);
                dispatch(getOrderFailedAction());
            })
    }
};
