import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const LoggedOutRoute = ({ component: C, isUserLoggedIn, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.getItem('loginStatus') === 'true' ? (
          <Redirect to="/homescreen" />
        ) : (
          <Switch>
            <C />
          </Switch>
        )
      }}
    />
  )
}

export default LoggedOutRoute
