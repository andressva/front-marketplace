import React, { useState, useEffect, useContext } from 'react'
import { MarketContext } from '../context'
import SuperRoutes from '../routes/SuperRoutes'
import AdminRoutes from '../routes/AdminRoutes'
import ClientRoutes from '../routes/ClientRoutes'

const routesComponents = {
  'SUPER': <SuperRoutes />,
  'ADMIN': <AdminRoutes />,
  'CLIENT': <ClientRoutes />,
}

const AppNavigator = () => {
  const { role } = useContext(MarketContext)
  const [ routes, setRoutes ] = useState(routesComponents[role])

  useEffect(() => {
    console.log(role)
    setRoutes(routesComponents[role])
  })

  return (
    <>
      {routes}
    </>
  )
}

export default AppNavigator
