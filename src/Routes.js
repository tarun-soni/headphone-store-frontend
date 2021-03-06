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
import Homescreen from './screens/Homescreen'
import OrderScreen from './screens/OrderScreen'
import Logout from './components/Logout'
import SingleProductScreen from './screens/SingleProductScreen'
import CartScreen from './screens/CartScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import AdminOrderList from './screens/AdminOrderList'
import AdminProductList from './screens/AdminProductList'
import RegisterScreen from './screens/LoginScreen/RegisterScreen'

const LOGIN = '/login'
const REGISTER = '/register'
const LOGOUT = '/logout'
const HOMESCREEN = '/homescreen'
const SINGLE_PRODUCT = '/product/:id'
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
        <Route path={REGISTER} exact component={RegisterScreen}></Route>

        <Route path="/" exact>
          <Redirect to={HOMESCREEN} />
        </Route>
        <Route path={SINGLE_PRODUCT} exact component={SingleProductScreen} />

        <Route path={HOMESCREEN} exact component={Homescreen} />
        <PrivateRoute path="/cart/:id?" component={CartScreen} />

        <PrivateRoute
          path="/order/:orderid"
          exact
          component={OrderScreen}
        ></PrivateRoute>
        <PrivateRoute
          path="/myorders"
          exact
          component={MyOrdersScreen}
        ></PrivateRoute>
        <PrivateRoute
          path="/admin/orderList"
          exact
          component={AdminOrderList}
        ></PrivateRoute>
        <PrivateRoute
          path="/admin/productlist"
          exact
          component={AdminProductList}
        ></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
