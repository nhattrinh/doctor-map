import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND } from './types';
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


/* possible routes:
    - make all fields required
        - easy to implement but not easy for middle name
    - do not make all fields required
        - find by each field
            - only in the fields that are populated
        - if one field matches then move on to the other
            - only conduct search using that field when that field has a length !== 0
        - steps:
            - find by Physician_First_Name
            - find by Physician_Middle_Name
            - find by Physician_Last_Name
            - if all of those fields satisfy (given that do not find if the field is empty)
                then dispatch a FOUND action with the payload of being the obj that passed all the filtering done by ES6 find function
*/

// RECOMMENDED TO MAKE FIRST NAME AND LAST NAME REQUIRED, NOT MIDDLE NAME
// IF NOT REQUIRED THEN DO FILTER FOR FIRST NAME THEN MIDDLE THEN LAST GIVEN THAT EACH FIELD IS POPULATED
export const submit = ({ firstName, middleName, lastName }) => {
    return dispatch => {
        var ref = firebase.database().ref('doctor-map-fd64c');
        ref.orderByChild('Physician_First_Name').equalTo(firstName).on('value', (snapshot) => {
            var snapshotKeys = Object.keys(snapshot);

            if (snapshotKeys.length === 1) {
                dispatch({
                    type: FOUND,
                    payload: {
                        snapshot,
                        snapshotKeys
                    }
                });
            }
            else if (!snapshotKeys.length) {
                dispatch({
                    type: NOT_FOUND,
                    payload: null
                });
            }
            else {
                var firstNameQuery = String(firstName).toLowerCase();
                var lastNameQuery = String(lastName).toLowerCase();
                var middleNameQuery = String(middleName).toLowerCase();

                var filteredArray = snapshotKeys.filter((obj) => {
                    return String(obj.Physician_First_Name).toLowerCase === firstNameQuery;
                });
                if (filteredArray.length && middleNameQuery.length) {
                    filteredArray = filteredArray.filter((obj) => {
                        return String(obj.Physician_Middle_name).toLowerCase === middleNameQuery;
                    });
                }
                if (filteredArray.length && lastNameQuery.length) {
                    filteredArray = filteredArray.filter((obj) => {
                        return String(obj.Physician_Last_name).toLowerCase === lastNameQuery;
                    });
                }
                dispatch({
                    type: FOUND,
                    payload: {
                        snapshot,
                        snapshotKeys
                    }
                });
            }
        });
    }
}