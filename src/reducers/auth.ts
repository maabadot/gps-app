import { ADD_TRACKER, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from "../types";
import { decode } from "base-64";

const initialState = {
    token: null,
    isAuthenticated: null,
    loading: false,
    user: null,
};

export default function (
    state = initialState,
    action: { type: string; payload: any }
) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: JSON.parse(decode(payload.token.split(".")[1])),
            };
        case REGISTER_SUCCESS:
            return {
                token: null,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            }
        case ADD_TRACKER:
            return {
                ...state,
                user: payload.user,
            };
        case LOGOUT: {
            return {
                token: null,
                isAuthenticated: null,
                loading: false,
                user: null,
            };
        }
        default:
            return state;
    }
}
