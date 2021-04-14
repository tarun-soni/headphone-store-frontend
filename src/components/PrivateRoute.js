import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'

const PrivateRoute = ({ component: C, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.getItem('loginStatus') === 'true' ? (
          <div className="d-flex flex-row flex-column-fluid page">
            <div className="d-flex flex-column flex-row-fluid wrapper">
              <Header />
              <C />
            </div>
          </div>
        ) : (
          <Switch>
            <Redirect to="/login" />
          </Switch>
        )
      }}
    />
  )
}

export default PrivateRoute
