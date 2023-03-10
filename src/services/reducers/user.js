import {
    // ---- AUTH
    AUTH_CHECK,
    // ---- REGISTER
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILED,
    // ---- GET USER
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    // ---- LOGIN
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    // ---- FORGOT PASSWORD
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    // ---- UPDATE USER
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    // ---- LOGOUT
    LOGOUT_USER
} from "../constants/constants";

const initialState = {
    isAuthChecked: false,
    data: null,

    registerUserRequest: false,
    registerUserError: null,

    getUserRequested: true,
    getUserError: null,

    loginUserRequest: false,
    loginUserError: null,
    isLoggedIn: false,

    forgotPasswordRequest: false,
    resetMessageSuccess: false,

    updateUserRequest: false,
    updateUserError: null
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
                registerUserRequest: true,
                registerUserError: null
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                data: action.user
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerUserError: true 
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserError: null
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                // data: action.payload
                data: action.user
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserError: false
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequested: true,
                getUserError: null
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequested: false,
                data: action.user
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserError: true,
                isUserRequested: false
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginUserRequest: true,
                loginUserError: null
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                data: action.user,
                isLoggedIn: true
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginUserError: true,
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginUserRequest: true,
                loginUserError: null
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
                data: null
            }
        }
        default: {
            return state;
        }
    }
};
