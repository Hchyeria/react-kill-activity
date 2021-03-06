import React from 'react';
import './styles/index.styl';
import 'normalize.css/normalize.css'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import RouteConfig from './config/Router'
import { Provider } from 'mobx-react'
import Layout from './components/layout'
import store from './store/store' 


const App = () => 
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Layout>
                <RouteConfig />
            </Layout>
        </Router>
    </Provider>
        

export default App;