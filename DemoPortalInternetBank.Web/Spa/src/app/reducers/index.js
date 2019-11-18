import { combineReducers } from 'redux';

const PLUGIN_LOAD_ERROR = (state = null, action) => {
    if (action.type === 'PLUGIN_LOAD_FINISHED') {
        return null;
    }
    if (action.type === 'PLUGIN_LOAD_ERROR') {
        return action.payload;
    }
    return state;
};

const DEVICES = (state = null, action) => {
    if (action.type === 'PLUGIN_DEVICES_FETCH_END') {
        return action.payload;
    }
    if (action.type === 'PLUGIN_LOAD_ERROR') {
        return null;
    }
    return state;
};

const CURRENT_DEVICE_ID = (state = null, action) => {
    if (action.type === 'PLUGIN_SET_CURRENT_DEVICE_ID') {
        return action.payload;
    }
    return state;
};


export default combineReducers({
    PLUGIN_LOAD_ERROR,
    CURRENT_DEVICE_ID,
    DEVICES,
});
