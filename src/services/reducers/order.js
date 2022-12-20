import { OPEN_ORDER, CLOSE_ORDER } from "../actions/order";

const initialState = {
    orderModalVisible: false
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
        default: return state
    }
};
