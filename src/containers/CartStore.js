import React, { useState, useEffect, useContext } from 'react'
import { Layout, Row, Table, Button} from 'antd'
import styles from '../styles/containers/CartStore.module.css'
import { MarketContext } from '../context'
import { Link } from 'react-router-dom'

// Components
import Header from '../components/Header' 
import Footer from '../components/Footer' 

const CartStore = () => {
  const { itemsCart, stores, removeItemFromCart } = useContext(MarketContext)
  const [ displayData, setDisplayData ] = useState([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    console.log(itemsCart)
    if(itemsCart.length > 0){
      setLoading(true)
      const tempData = itemsCart.map((i, idx) => {
        return {
          key: idx,
          id: i.product.idProducto,
          name: i.product.nombre,
          store: stores.find( s => s.idTienda == i.product.idTienda).nombre,
          amount: i.amount,
          price: i.product.precio
        }
      })

      setDisplayData(tempData)
      setLoading(false)
    } else {
      setDisplayData([])
    }
  }, [itemsCart])
  
  const handleRemove = item => {
    setLoading(true)
    removeItemFromCart({id: item.id}).then(() => {
        setLoading(false)
      }
    )
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/product/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Tienda',
      dataIndex: 'store',
      key: 'store',
    },
    {
      title: 'Unidades',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: text => <strong>${text}</strong>
    },
    {
      title: 'Remover',
      key: 'remove',
      render: (text, record) => (
        <Button onClick={() => handleRemove(record)} type="danger">
          Eliminar
        </Button>
      ),
    },
  ];

  return (
      <Layout style={{height: '100vh'}}>
          <Header/>
          <Layout.Content className={styles.container}>
            <Row className={styles.content}>
              {loading ? (
                <h1>Cargando...</h1>
              ) : (
                <>
                <Table columns={columns} dataSource={displayData} pagination={false} />
                <Row className={styles.totalWrap}>
                  <h1>Total: <span className={styles.total}>${ itemsCart.length > 0 ? itemsCart.map(i => i.amount * i.product.precio).reduce((a, b) => a+b) : 0 }</span></h1>
                  {itemsCart.length > 0 && ( <Button className={styles.payButton} type="primary" >Pagar</Button> )}
                </Row>
                </>
              )}
            </Row>
          </Layout.Content>
          <Footer/>
      </Layout>
  )
}

export default CartStore
