import {
    OPEN_ORDER,
    CLOSE_ORDER,
    CALCULATE_PRICE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from "../constants/constants";

const initialState = {
    orderModalVisible: false,
    orderRequest: false,
    orderFailed: false,
    orderNumber: "",
    finalPrice: 0
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER:
            return {
                ...state,
                orderModalVisible: true
            }
        case CLOSE_ORDER:
            return {
                ...state,
                orderModalVisible: false
            }
        case CALCULATE_PRICE: {
            return {
                ...state,
                finalPrice: action.finalPrice
            }
        }
        case GET_ORDER_REQUEST:
            return { ...state, orderRequest: true }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false
            }
        case GET_ORDER_FAILED:
            return { ...state, orderRequest: false, orderFailed: true }
        default: return state
    }
};
