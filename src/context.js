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
  const [ itemsCart, setItemsCart ] = useLocalStorage('sesion_items_cart', [])

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleLogin = (data) => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      login({ correo: data.email, clave: data.password })
        .then((resp) => {
          console.log(resp)
          const tempRole = arrRoles[resp.data.objResponse.rol]
          console.log(resp.data.objResponse.correo)
          setUser({email: resp.data.objResponse.correo})
          setIsLogin(true)
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

  const addItemToCart = ({ product, amount }) => {
    return new Promise(resolve => {
      const tempItems = [...itemsCart]
      tempItems.push({product, amount})
      setItemsCart(tempItems)
      resolve(true)
    })
  }

  const removeItemFromCart = ({ id }) => {
    return new Promise(resolve => {
      const tempItems = itemsCart.filter(i => i.product.idProduct != id)
      setItemsCart(tempItems)
      resolve(true)
    })
  }

  return (
    <MarketContext.Provider value={{
      user,
      role,
      itemsCart,
      requesting,
      isLogin,
      handleLogin,
      addItemToCart,
      removeItemFromCart
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export { MarketContext, MarketProvider }
