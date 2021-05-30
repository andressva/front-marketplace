import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// Pages
import Home from '../containers/Home'
import Login from '../containers/Login'
import Product from '../containers/Product'

export const clientRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login />,
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    component: <Product />,
  },
  {
    path: '/',
    name: 'Home',
    component: <Home />,
  },
]


const ClientRoutes = () => {
  return (
    <Switch>
      {clientRoutes.map(rt => (
        <Route path={rt.path}>
          {rt.component}
        </Route>
      ))}
    </Switch>
  )
}

export default ClientRoutes
