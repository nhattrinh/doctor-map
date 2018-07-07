import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND, STOP_SEARCH, START_SEARCH, CLEAR_ERROR, CLEAR_DOCTORS } from '../actions/types';
const initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    doctors: [],
    searching: false,
    error: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FIRSTNAME_CHANGED:
            return { ...state, firstName: action.payload };
        case MIDDLENAME_CHANGED:
            return { ...state, middleName: action.payload };
        case LASTNAME_CHANGED:
            return { ...state, lastName: action.payload };
        case NOT_FOUND:
            return { ...state, error: 'Physician not found', searching: false};
        case FOUND:
            return { ...state, doctors: action.payload, searching: false };
        case START_SEARCH: 
            return { ...state, searching: true };
        case STOP_SEARCH:
            return { ...state, searching: false };
        case CLEAR_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_DOCTORS:
            return { ...state, doctors: action.payload };
        default:
            return state;
    }
}