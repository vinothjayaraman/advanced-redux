import {createSelecor} from 'reselect';

export const currentUserSelector = createSelecor(
    state=>state.get(`currentUser`),
    currentUser=>currentUser
);