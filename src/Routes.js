import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoggedOutRoute from './components/LoggedOutRoute'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import Homescreen from './screens/Homescreen'
import { UserOrderScreen } from './screens/UserOrderScreen'
import Logout from './components/Logout'

const LOGIN = '/login'
const LOGOUT = '/logout'
const HOMESCREEN = '/homescreen'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={LOGOUT} exact component={Logout}></Route>

        <LoggedOutRoute
          path={LOGIN}
          exact
          component={LoginScreen}
        ></LoggedOutRoute>

        <Route path="/" exact>
          <Redirect to={HOMESCREEN} />
        </Route>

        <Route path={HOMESCREEN} exact component={Homescreen}></Route>

        <PrivateRoute
          path="/orders"
          exact
          component={UserOrderScreen}
        ></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
