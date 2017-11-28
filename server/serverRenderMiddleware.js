import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import fs from 'fs';
import template from 'lodash/template';
import {App} from '../src/App';
import {reducer} from '../src/reducers';

const readModuleFile = (path,callback) => {
    try {
        const fileName = require.resolve(path);
        fs.readFile(fileName,'utf8',callback);
    } catch (e) {
        callback(e);
    }
};

export const handleRender = (getState)  => (req,res) => {
    let defaultState = getState();

    const store = createStore(reducer,defaultState);

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const preloadedstate = store.getState().toJS();

    readModuleFile('../public/index.html',(err,index)=>{
        const templated = template(index) ({
            html,
            preloadedstate: JSON.stringify(preloadedstate).replace(/</g, '\\u003c')
        });
        res.send(templated);
    });
};
