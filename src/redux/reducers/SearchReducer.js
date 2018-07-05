import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND, STOP_SEARCH, START_SEARCH } from '../actions/types';
const initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    doctorsArray: [],
    inProgress: false,
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
            return { ...state, error: 'User was not found!'};
        case FOUND:
            return { ...state, doctorsArray: action.payload };
        case START_SEARCH: 
            return { ...state, inProgress: true };
        case STOP_SEARCH:
            return { ...state, inProgress: false };
        default:
            return state;
    }
}