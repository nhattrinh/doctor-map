import { FIRSTNAME_CHANGED, MIDDLENAME_CHANGED, LASTNAME_CHANGED, FOUND, NOT_FOUND, START_SEARCH, STOP_SEARCH, CLEAR_ERROR, CLEAR_DOCTORS } from './types';
import firebase from 'firebase';
import axios from 'axios';

import { MAPS_API_KEY } from '../../config';

export const clearError = () => {
    return({
        type: CLEAR_ERROR,
        payload: ''
    });
}

export const clearDoctors = () => {
    return({
        type: CLEAR_DOCTORS,
        payload: []
    });
}

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

export const submit = (firstName, middleName, lastName) => {
    return (dispatch) => {
        dispatch({ 
            type: START_SEARCH
        });
        var ref = firebase.database().ref();
        ref.on('value', snapshot => {
            if (snapshot.exists()){
                var snapshotKeys = snapshot.val();
                dispatch({
                    type: CLEAR_ERROR,
                    payload: ''
                });

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

                if (filteredArray.length){
                    var promises = [];

                    filteredArray.map(v => {
                        promises.push(axios.get(String('https://maps.googleapis.com/maps/api/geocode/json?address=' + v.Recipient_Primary_Business_Street_Address_Line1 + ',+' + v.Recipient_City + ',+' + v.Recipient_State + ',+' + v.Recipient_Zip_Code + '&key=' + MAPS_API_KEY).replace(/ /g, '+')))
                    });
    
                    axios.all(promises)
                        .then(axios.spread((...args) => {
                            args.map((v,i) => {
                                filteredArray[i].lat = v.data.results[0].geometry.location.lat;
                                filteredArray[i].lng = v.data.results[0].geometry.location.lng;
                            });
                        }))
                        .then(() => {
                            dispatch({ type: STOP_SEARCH });
                            dispatch({
                                type: FOUND,
                                payload: filteredArray
                            });
                        });
                }

                else {
                    dispatch({ type: STOP_SEARCH });
                    dispatch({
                        type: NOT_FOUND,
                        payload: null
                    });
                }
            }
            else {
                dispatch({ type: STOP_SEARCH });
                dispatch({
                    type: NOT_FOUND,
                    payload: null
                });
            }
        });
        dispatch({ type: STOP_SEARCH });
    }
}