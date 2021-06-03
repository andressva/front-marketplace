import React, { useEffect, useState } from 'react'
import { login, getCategories, getStores } from './services'
import { ROLES } from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'


const arrRoles = [ ROLES.SUPER, ROLES.ADMIN, ROLES.CLIENT ]
const MarketContext = React.createContext()

const MarketProvider = (props) => {
  const [ role, setRole ] = useLocalStorage('sesion_role', ROLES.CLIENT)
  const [ user, setUser ] = useLocalStorage('sesion_user', {})
  const [ isLogin, setIsLogin ] = useLocalStorage('sesion_login', false)
  const [ requesting, setRequesting ] = useState(true)
  const [ itemsCart, setItemsCart ] = useLocalStorage('sesion_items_cart', [])
  const [ filters, setFilters ] = useState({ categories: [], stores: [] })
  const [ categories, setCategories ] = useState([])
  const [ stores, setStores ] = useState([])

  useEffect( async () => {
    const fetchData = async () => {
      const respCtg = await getCategories()
      if(respCtg.status){
        const catgs = respCtg.data
        setCategories(catgs)
      }
  
      const respStrs = await getStores()
      if(respStrs.status){
        const strs = respStrs.data
        setStores(strs)
      }
    }

    await fetchData()
    setRequesting(false)
  }, [])

  const handleLogin = (data) => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      login({ correo: data.email, clave: data.password })
        .then((resp) => {
          const tempRole = arrRoles[resp.data.objResponse.rol]
          setUser({email: resp.data.objResponse.correo})
          setIsLogin(true)
          setRole(tempRole)
          setTimeout(() => {
            setRequesting(false)
            resolve(true)
          }, 2000)
        })
        .catch(() => {
          setRequesting(false)
          resolve(false)
        })
    })
  }

  const handleLogout = () => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      setUser({})
      setIsLogin(false)
      setRole(ROLES.CLIENT)
      setItemsCart([])
      setTimeout(() => {
        setRequesting(false)
        resolve(true)
      }, 2000)
    })
  }

  const addItemToCart = ({ product, amount }) => {
    return new Promise(resolve => {
      const tempItems = [...itemsCart]
      const _tempItems = tempItems.filter(i => i.product.idProducto != product.idProducto)
      _tempItems.push({product, amount})
      setItemsCart(_tempItems)
      resolve(true)
    })
  }

  const removeItemFromCart = ({ id }) => {
    return new Promise(resolve => {
      const tempItems = itemsCart.filter(i => i.product.idProducto != id)
      setItemsCart(tempItems)
      resolve(true)
    })
  }

  const handleFilters = (ftrs) => {
    setFilters({...filters, ...ftrs})
  }

  return (
    <MarketContext.Provider value={{
      user,
      role,
      itemsCart,
      categories,
      stores,
      requesting,
      isLogin,
      filters,
      handleFilters,
      handleLogin,
      handleLogout,
      addItemToCart,
      removeItemFromCart
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export { MarketContext, MarketProvider }
