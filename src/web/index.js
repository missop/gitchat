import React from 'react';
import ReactDOM from 'react-dom';
import './assets/commonstyle/mixin.less'

import GetRouter from './route'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './containers'

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <GetRouter/>
    </Provider>,
    document.getElementById('main')
);
