import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED } from './types';
import firebase from 'firebase';

export const firstNameChanged = (text) => {
    return({
        type: FIRSTNAME_CHANGED,
        payload: text
    }); 
};

export const middleNameChanged = (text) => {
    return({
        type: MIDDLENAME_CHANGED,
        payload: text
    });
};

export const lastNameChanged = (text) => {
    return({
        type: LASTNAME_CHANGED,
        payload: text
    });
}

export const submit = ({ firstName, middleName, lastName }) => {
    return dispatch => {
        firebase.database().ref('doctor-map-fd64c').child()
    }
}