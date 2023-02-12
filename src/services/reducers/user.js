import {
    AUTH_CHECK,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    LOGOUT_USER
} from "../actions/user";

const initialState = {
    isAuthChecked: false,
    data: null,

    registerUserRequest: false,
    registerUserError: null,

    forgotPasswordRequest: false,
    resetMessageSuccess: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CHECK: {
            return {
                ...state,
                isAuthChecked: true
            }
        }
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerUserRequest: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                data: action.payload
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerUserError: true 
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                isUserRequested: true,
                getUserError: null
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                isUserRequested: false,
                data: action.payload
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserError: true,
                isUserRequested: false
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetMessageSuccess: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                resetMessageSuccess: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                data: null,
                isAuthChecked: false
            }
        }
        default: {
            return state;
        }
    }
};
