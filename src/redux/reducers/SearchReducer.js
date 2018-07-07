import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND, CLEAR_ERROR, CLEAR_DOCTORS } from '../actions/types';
const initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    doctors: [],
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
            return { ...state, error: 'Physician not found' };
        case FOUND:
            return { ...state, doctors: action.payload };
        case CLEAR_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_DOCTORS:
            return { ...state, doctors: action.payload };
        default:
            return state;
    }
}