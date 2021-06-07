import axios from "axios";

import { ADD_TRACKER, LOGIN_SUCCESS, LOGOUT } from "../types";
import { BASE_URL } from "../config";

export const login = (email: string, password: string) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            `${BASE_URL}/auth/login`,
            body,
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.access_token,
            },
        });
    } catch (err) {
        console.log(err.response.data);
    }
};

export const register = (
    email: string,
    userPassword: string,
    name: string
) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, userPassword, name });

    try {
        const res = await axios.post(
            `${BASE_URL}/users/register`,
            body,
            config
        );
        if (res.status === 201) {
            dispatch(login(email, userPassword));
        }
    } catch (err) {
        console.log(err.response.data);
    }
};

export const addTracker = (
    trackerId: string,
    trackerPassword: string,
    alias: string,
    token: string
) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const body = JSON.stringify({ trackerPassword, alias });
    try {
        const res = await axios.post(
            `${BASE_URL}/users/addtracker/${trackerId}`,
            body,
            config
        );
        dispatch({
            type: ADD_TRACKER,
            payload: {
                user: res.data,
            },
        });
    } catch (err) {
        console.log(err.response.data);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: null,
    });
};
