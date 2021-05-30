import React, { useState, useEffect } from 'react'
import { Card, List } from 'antd'
import styles from '../styles/components/ProductList.module.css'
import { useHistory } from 'react-router-dom'
import { loadProducts } from '../services/index'
import imgDefault from '../assets/no-image.png'

const Header = () => {
    let history = useHistory() 
    const [ products, setProducts ] = useState([])
    const [ requesting, setRequesting ] = useState(true)

    useEffect(async () => {
      const {status, data} =  await loadProducts()
      if(status){
        setProducts(data)
      }
      setRequesting(false)
    }, [])

    if(requesting){
      return(
        <h3>Cargando...</h3>
      )
    }

    const handleViewProduct = (prod) => {
      history.push(`/product/${prod.idProducto}`)
    }

    return (
      <>
      {products.length > 0 ? (
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 6,
          }}
          dataSource={products}
          renderItem={item => (
            <List.Item>
              <Card
                onClick={() => handleViewProduct(item)}
                className={styles.item}
                cover={
                  <img
                    alt={item.nombre}
                    src={imgDefault}
                  />
                } 
              >
                <Card.Meta
                  title={<span>{item.nombre}</span>}
                  description={item.precio}
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <h3>No hay productos!</h3>
      )}
      </>
    )
}

export default Header
