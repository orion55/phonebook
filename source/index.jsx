import React from 'react';
import 'babel-polyfill';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';

import './styles/main.scss';

import history from './history';
import store from './store';

import AppView from './views/AppView';
import MainView from './views/MainView';
import SecondView from './views/SecondView';
import ThirdView from './views/ThirdView';



render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={AppView}>
                <IndexRoute component={MainView}/>
                <Route path='/second' component={SecondView}/>
                <Route path='/third' component={ThirdView}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
