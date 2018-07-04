import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED } from '../actions/types';
const initialState = {
    firstName: '',
    middleName: '',
    lastName: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FIRSTNAME_CHANGED:
            return { ...state, firstName: action.payload };
        case MIDDLENAME_CHANGED:
            return { ...state, middleName: action.payload };
        case LASTNAME_CHANGED:
            return { ...state, lastName: action.payload };
        default:
            return state;
    }
}