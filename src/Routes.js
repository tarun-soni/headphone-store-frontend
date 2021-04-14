import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoggedOutRoute from './components/LoggedOutRoute'
import LoginScreen from './screens/LoginScreen/LoginScreen'
const LOGIN = '/login'

const Routes = () => {
  // todo get current user using token and set local recoil state

  return (
    <Router>
      <Switch>
        <LoggedOutRoute
          path={LOGIN}
          exact
          component={LoginScreen}
        ></LoggedOutRoute>

        <PrivateRoute path="/" exact>
          <Redirect to="/homescreen" />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
