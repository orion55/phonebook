import React from 'react';
import 'babel-polyfill';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';

import './styles/main.scss';

import history from './router/router';
import store from './store/store';

import AppView from './views/AppView';
import MainView from './views/MainView';
import SecondView from './views/SecondView';

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={AppView}>
                <IndexRoute component={MainView}/>
                <Route path='/user/:id' component={SecondView}/>
                <Route path='*' component={MainView}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
