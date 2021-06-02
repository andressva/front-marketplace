import React, { useState, useEffect, useContext } from 'react'
import { Layout, Row, Col} from 'antd'
import styles from '../styles/containers/CartStore.module.css'
import { MarketContext } from '../context'

// Components
import Header from '../components/Header' 
import Footer from '../components/Footer' 

const CartStore = () => {
  const { itemsCart } = useContext(MarketContext)

  return (
      <Layout style={{height: '100vh'}}>
          <Header/>
          <Layout.Content className={styles.container}>
            {itemsCart.length > 0 ? itemsCart.map(i => <span>{i.product.nombre} - {i.product.precio}, Cantidad: {i.amount}</span> ) : <></>}
          </Layout.Content>
          <Footer/>
      </Layout>
  )
}

export default CartStore
