import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND } from '../actions/types';
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
        case NOT_FOUND:
            return { ...state, error: 'User was not found!'};
        case FOUND:
            return { ...state, snapshot: action.payload.snapshot, snapshotKeys: action.payload.snapshotKeys };
        default:
            return state;
    }
}