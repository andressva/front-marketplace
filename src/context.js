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
      addItemToCart,
      removeItemFromCart
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export { MarketContext, MarketProvider }
