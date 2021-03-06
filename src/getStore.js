import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
export {DevTools} from './components';
import thunk from 'redux-thunk';
import {createSocketMiddleware} from './socketMiddleware';
//import {users} from '../server/db';
import {RECEIVE_MESSAGE} from './actions';
const io = window.io;
import {initializeDB} from '../server/db/initializeDB';
import {createLogger} from 'redux-logger';
import {getPreloadedState} from './getPreloadedState';
import createSagaMiddleware from 'redux-saga';
import {currentUserStatusSaga} from './sagas/currentUserStatusSaga';
import { initSagas } from './initSagas';
const socketConfigOut = {
    UPDATE_STATUS:(data)=>({
        type: `UPDATE_USER_STATUS`,
        status: data
    })
};

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware(io) (socketConfigOut);

initializeDB();

import {reducer} from './reducers';
import { DevTools } from './components/DevTools/DevTools';

//const currentUser = users[0];
//const defaultState = getDefaultState(currentUser);

//console.log(defaultState);

const logger = createLogger({
    stateTransformer:state=>state.toJS()
});

const enhancer = compose(
    applyMiddleware(
        sagaMiddleware,
        thunk,
        socketMiddleware,
        logger
    ),
    DevTools.instrument()
);
const store = createStore(reducer,getPreloadedState(),enhancer);

const socketConfigIn = {
    NEW_MESSAGE:(data)=>({
        type: RECEIVE_MESSAGE,
        message:data
    })
};

const socket = io();
for (const key in socketConfigIn) {
        socket.on(key,data=>{
            store.dispatch(socketConfigIn[key](data));
        });
}

export const getStore = ()=>store;
initSagas(sagaMiddleware);