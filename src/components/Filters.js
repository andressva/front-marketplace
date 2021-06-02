import React, { useState, useEffect, useContext } from 'react'
import { Card, List, Checkbox } from 'antd'
import styles from '../styles/components/Filters.module.css'
import { getCategories, getStores } from '../services/index'
import { MarketContext } from '../context'

const Filters = () => {
  const { handleFilters } = useContext(MarketContext)
  const [ categories, setCategories ] = useState([])
  const [ stores, setStores ] = useState([])

  useEffect(() => {
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

    fetchData()
  }, [])

  const handleCategoriesChange = (value) => {
    handleFilters({ categories: value })
  }

  const handleStoresChange = (value) => {
    handleFilters({ stores: value })
  }
  return (
    <div className={styles.contentFilter}>
      <Card
        style={{ width: "80%" }}
        bodyStyle={{
          paddingTop: "10px"
        }}
      >
        <div className={styles.itemFilter}>
          <p>Categorias</p>
          <Checkbox.Group
            onChange={handleCategoriesChange}
          >
            {categories.length > 0 && (
              <>
                {categories.map((catg) => (
                  <Checkbox key={catg.idCategoria} className={styles.checkbox} value={catg.idCategoria}>
                    {catg.nombre}
                  </Checkbox>
                ))}
              </>
            )}
          </Checkbox.Group>
        </div>
        <div className={styles.itemFilter}>
          <p>Tiendas</p>
          <Checkbox.Group
            onChange={handleStoresChange}
          >
            {stores.length > 0 && (
              <>
                {stores.map((str) => (
                  <Checkbox key={str.idTienda} className={styles.checkbox} value={str.idTienda}>
                    {str.nombre}
                  </Checkbox>
                ))}
              </>
            )}
          </Checkbox.Group>
        </div>
      </Card>
    </div>
  )
}

export default Filters
