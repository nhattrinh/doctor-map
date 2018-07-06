import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND, STOP_SEARCH, START_SEARCH, ERROR_CLEAR } from '../actions/types';
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
            console.log('dispatching error');
            return { ...state, error: 'Physician not found'};
        case FOUND:
            return { ...state, doctors: action.payload };
        case START_SEARCH: 
            return { ...state, searching: true };
        case STOP_SEARCH:
            return { ...state, searching: false };
        case ERROR_CLEAR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}