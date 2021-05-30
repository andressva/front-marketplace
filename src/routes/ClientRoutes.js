import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// Pages
import Home from '../containers/Home'
import Login from '../containers/Login'

export const clientRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login />,
  },
  {
    path: '/',
    name: 'Home',
    component: <Home />,
  },
]


const ClientRoutes = () => {
  console.log(clientRoutes)
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
