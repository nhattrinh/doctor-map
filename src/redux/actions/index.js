import { firstNameChanged, middleNameChanged, lastNameChanged } from './types';

export const firstNameChanged = (text) => {
    return({
        type: firstNameChanged,
        payload: text
    }); 
};

export const middleNameChanged = (text) => {
    return({
        type: middleNameChanged,
        payload: text
    });
};

export const lastNameChanged = (text) => {
    return({
        type: lastNameChanged,
        payload: text
    });
}