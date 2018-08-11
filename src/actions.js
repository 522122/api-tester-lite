import uid from "uid";

// data reducer
export const NEW_LINE = "NEW_LINE";
export const REMOVE_LINE = "REMOVE_LINE";
export const FIELD_UPDATE = "FIELD_UPDATE";

// url reducer
export const URL_UPDATE = "URL_UPDATE";

// method reducer
export const METHOD_UPDATE = "METHOD_UPDATE";

export const SET_RESPONSE = "SET_RESPONSE";

// response
export const setResponse = response => {
    return {
        type: SET_RESPONSE,
        response
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
export const newLine = (data = { active: false, prop: "", value: "" }) => {
    return {
        type: NEW_LINE,
        data: { ...data, id: uid() }
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
