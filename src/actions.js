import uid from "uid";
import axios from "axios";

// data reducer
export const NEW_LINE = "NEW_LINE";
export const REMOVE_LINE = "REMOVE_LINE";
export const FIELD_UPDATE = "FIELD_UPDATE";

// url reducer
export const URL_UPDATE = "URL_UPDATE";

// method reducer
export const METHOD_UPDATE = "METHOD_UPDATE";

export const SET_RESPONSE = "SET_RESPONSE";

export const SUBMIT_REQUEST = "SUBMIT_REQUEST";

export const HISTORY_ADD = "HISTORY_ADD";

export const SUBMIT = "SUBMIT";
export const BACK_IN_TIME = "BACK_IN_TIME";

export const CLEAN = "CLEAN";

export const backInTime = id => {
    return (dispatch, getState) => {
        //type: BACK_IN_TIME,
        console.log(getState().history);
        const history = getState().history.find(h => h.id === id);
        dispatch(cleanData());
        dispatch(methodUpdate(history.method));
        dispatch(urlUpdate(history.url));
        dispatch(setResponse(history.response));
        history.data.forEach(element => {
            dispatch(
                newLine({
                    active: element.active,
                    prop: element.prop,
                    value: element.value
                })
            );
        });
    };
};

export const setResponse = response => {
    return {
        type: SET_RESPONSE,
        response
    };
};

export const historyAdd = data => {
    return {
        type: HISTORY_ADD,
        data: { ...data, id: uid(10) }
    };
};

export const submit = data => {
    return dispatch => {
        //localStorage.setItem("state", JSON.stringify(request));
        dispatch(submitRequest(data)).then(response => {
            dispatch(setResponse(response.value));
            dispatch(historyAdd({ ...data, response: response.value }));
        });
    };
};

export const submitRequest = ({ data, method, url }) => {
    return {
        type: SUBMIT_REQUEST,
        payload: new Promise((resolve, reject) => {
            let filteredData = data.filter(v => v.active).reduce((a, b) => {
                return { ...a, [b.prop]: b.value };
            }, {});

            axios({
                data: filteredData,
                method,
                url
            })
                .then(response => {
                    //console.log(response);
                    resolve(response);
                })
                .catch(e => {
                    console.log(e);
                    if (e.response) {
                        resolve(e.response);
                    } else {
                        resolve({
                            error:
                                "Error while fetching data, see console for more details."
                        });
                    }
                });
        })
    };
};

// method
export const methodUpdate = method => {
    return {
        type: METHOD_UPDATE,
        method
    };
};

// url
export const urlUpdate = url => {
    return {
        type: URL_UPDATE,
        url
    };
};

// data
export const cleanData = () => {
    return {
        type: CLEAN
    };
};

export const newLine = (data = { active: false, prop: "", value: "" }) => {
    return {
        type: NEW_LINE,
        data: { ...data, id: uid(10) }
    };
};

export const removeLine = id => {
    return {
        type: REMOVE_LINE,
        id
    };
};

export const fieldUpdate = data => {
    return {
        type: FIELD_UPDATE,
        data
    };
};
