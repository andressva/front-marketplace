import React, { useEffect, useState } from 'react'
import { login } from './services'
import { ROLES } from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'


const arrRoles = [ ROLES.SUPER, ROLES.ADMIN, ROLES.CLIENT ]
const MarketContext = React.createContext()

const MarketProvider = (props) => {
  const [ role, setRole ] = useLocalStorage('sesion_role', ROLES.CLIENT)
  const [ user, setUser ] = useLocalStorage('sesion_user', {})
  const [ isLogin, setIsLogin ] = useState(false)
  const [ requesting, setRequesting ] = useState(false)

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleLogin = (data) => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      login({ correo: data.email, clave: data.password })
        .then((resp) => {
          const tempRole = arrRoles[resp.data.objResponse.rol]
          setUser({email: resp.data.objResponse.correo})
          setRole(tempRole)
          setRequesting(false)
          resolve(true)
        })
        .catch(() => {
          setRequesting(false)
          resolve(false)
        })
    })
  } 

  return (
    <MarketContext.Provider value={{
      user,
      role,
      requesting,
      isLogin,
      handleLogin,
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export { MarketContext, MarketProvider }
