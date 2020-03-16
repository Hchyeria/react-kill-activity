import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom'

import {
    inject,
    observer,
} from 'mobx-react'

import App from '../pages/index/index'
import Login from '../pages/loginRegist'
import Detail from '../pages/detail/index'
import Sell from '../pages/sell/index'


const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {
      (props) => (
        isLogin
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              search: `?from=${props.match.url}`,
            }}
          />
        )
      )
    }
  />
)


const InjectPrivateRoute = withRouter(inject(({ store }) => {
  return {
    isLogin: store.appState.isLogin,
  }
})(observer(PrivateRoute)))
  


export default () => (
  <Switch>
    <Route path="/" exact component={App} key="index" />} />
    <Route path="/login" component={Login} key="login" />
    <InjectPrivateRoute path="/detail/:id" component={Detail} key="detail" />
    <InjectPrivateRoute path="/sell" component={Sell} key="sell" />
  </Switch>
)
