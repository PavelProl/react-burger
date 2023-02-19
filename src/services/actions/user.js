import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";
import {
    registerUserApi,
    forgotPasswordApi,
    logoutApi,
    getUserApi,
    loginUserApi,
    updateUserApi } from "../../utils/api";

export const AUTH_CHECK = "AUTH_CHECK";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const GET_USER_REQUEST = "REGISTER_USER_REQUEST";
export const GET_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const GET_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const LOGOUT_USER = "LOGOUT_USER";

export const checkUserAuth = () => (dispatch) => {
    if (getCookie("accessToken")) {
        // если есть токен, то запрашиваем данные пользователя
        dispatch(
            getUser(() => {
                dispatch({ type: AUTH_CHECK });
            })
        );
    } else {
        dispatch({ type: AUTH_CHECK });
    }
};

export const getUser = (afterCallback) => (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    return getUserApi()
        .then(res => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.user
            });
        })
        .catch(err => {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            });
        })
        .finally(() => {
            afterCallback();
        });
};

export const logoutUser = () => (dispatch) => {
    return logoutApi()
        .then(() => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            dispatch({ type: LOGOUT_USER });
        })
        .catch(() => {
            alert("Ошибка выхода пользователя");
        })
};

export const registerUser = ({email, name, password}) => (dispatch) => {
    dispatch(
        {type: REGISTER_USER_REQUEST }
    );
    return registerUserApi({ email, name, password })
        .then((res) => {
                setCookie("accessToken", res.accessToken);
                setCookie("refreshToken", res.refreshToken);
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: res
            });
        })
        .catch(() => {
            alert("Ошибка регистрации пользователя");
            dispatch({ type: REGISTER_USER_FAILED });
        })
};

export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    return loginUserApi({ email, password })
        .then((res) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            console.log("RES FROM LOGIN USER", res)
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: res.user
            });
        });
};

export const updateUser = ({email, name, password}) => (dispatch) => {
    dispatch(
        {type: UPDATE_USER_REQUEST }
    );
    return updateUserApi({ email, name, password })
        .then((res) => {
                console.log("RES FROM UPDATE", res)
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: res.user
            });
        })
        .catch(() => {
            alert("Ошибка изменения пользователя");
            dispatch({ type: UPDATE_USER_FAILED });
        })
};

export const forgotUserPassword = ({ email }) => (dispatch) => {
    dispatch(
        { type: FORGOT_PASSWORD_REQUEST }
    );
    return forgotPasswordApi({ email })
        .then(res => {
            dispatch(
                { type: FORGOT_PASSWORD_SUCCESS }
            )
            console.log("data from forgotPass", res)
        })
        .catch(() => {
            alert("Ошибка восстановления пароля");
            dispatch({ type: FORGOT_PASSWORD_FAILED });
        })
};
