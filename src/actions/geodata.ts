import axios from "axios";

import { GEODATA_SUCCESS } from "../types";
import { BASE_URL } from "../config";

export const getGeodata = (
    token: string,
    trackerId: string,
    from = undefined,
    to = undefined
) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const url =
            from && to
                ? `${BASE_URL}/geotags/${trackerId}?from=${from}&to=${to}`
                : `${BASE_URL}/geotags/${trackerId}`;
        const res = await axios.get(url, config);
        dispatch({
            type: GEODATA_SUCCESS,
            payload: {
                tracker: trackerId,
                data: res.data,
            },
        });
    } catch (err) {
        console.log(err.response.data);
    }
};
