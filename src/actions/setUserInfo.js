import {makeActionCreator} from '../utility';

export const SET_USER_INFO = `SET_USER_INFO`;
export const setUserInfo = makeActionCreator(SET_USER_INFO,`user`);