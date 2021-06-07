import { LOGOUT, GEODATA_SUCCESS } from "../types";

const initialState = {
    loading: true,
    activeTrackerId: null,
    data: null,
};

export default function (
    state = initialState,
    action: { type: string; payload: any }
) {
    const { type, payload } = action;
    switch (type) {
        case GEODATA_SUCCESS:
            return {
                loading: false,
                activeTrackerId: payload.tracker,
                data: payload.data
            }
        case LOGOUT:
            return {
                loading: true,
                activeTrackerId: null,
                data: null, 
            };
        default:
            return state;
    }
}
