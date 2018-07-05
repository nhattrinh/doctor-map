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
export const submit = (firstName, middleName, lastName) => {
    return (dispatch) => {
        var ref = firebase.database().ref();
        ref.on('value', snapshot => {
            if (snapshot.exists()){
                var snapshotKeys = snapshot.val();

                // important to make the parts of the name of doctors from database and query into lowercase, because the data is not always perfect
                // get all the doctors from the database
                // filter through a variable called filteredArray to check if the last and first name (in lowercase) equals to the first and last name in lowercase from the user form submission
                var filteredArray = snapshotKeys.filter(obj => String(obj.Physician_First_Name).toLowerCase() === String(firstName).toLowerCase());
                filteredArray = filteredArray.filter(obj => String(obj.Physician_Last_Name).toLowerCase() === String(lastName).toLowerCase());
                
                // lastly check if the middle name are the same
                // this check is isolated because the app does not make middle name input compulsory
                if (filteredArray.length && middleName.length) {
                    filteredArray = filteredArray.filter(obj => String(obj.Physician_Middle_Name).toLowerCase() === String(middleName).toLowerCase());
                }

                if (filteredArray.length) {
                    dispatch({
                        type: FOUND,
                        payload: filteredArray
                    });
                }
                else {
                    dispatch({
                        type: NOT_FOUND,
                        payload: null
                    });
                }
            }
        });
    }
}