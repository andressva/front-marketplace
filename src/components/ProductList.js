import React, { useState, useEffect, useContext } from 'react'
import { Card, List } from 'antd'
import styles from '../styles/components/ProductList.module.css'
import { useHistory } from 'react-router-dom'
import { loadProducts } from '../services/index'
import imgDefault from '../assets/no-image.png'
import { MarketContext } from '../context'

const ProductList = () => {
    let history = useHistory() 
    const { filters } = useContext(MarketContext)
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
            xl: 5,
            xxl: 5,
          }}
          dataSource={products.filter(p => {
            return filters ? 
              (filters.categories.length > 0 ? filters.categories.includes(p.idCategoria) : true) &&
              (filters.stores.length > 0 ? filters.stores.includes(p.idTienda) : true) 
            : true   
          })}
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

export default ProductList
