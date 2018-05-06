import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Calendar from './containers/calendar';

import recordReducer from './reducers';



const store = createStore(recordReducer);


render(
    <Provider store={store}>
        <Calendar />
    </Provider>,
    document.getElementById('root')
);