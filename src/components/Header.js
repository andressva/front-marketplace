import React, { useContext } from 'react'
import { Layout, Avatar, Col } from 'antd'
import styles from '../styles/components/Header.module.css'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { MarketContext } from '../context'

const Header = () => {
    let history = useHistory()
    const { user } = useContext(MarketContext)
    return (
       <Layout.Header className={styles.container}>
         <img
          onClick={() => { history.push('/') }}
          style={{cursor: 'pointer'}}
          width={200}
          src={logo}
        />
        <div style={{display: 'flex'}}>
          {user.email ? (
            <Col>
              <span style={{marginRight: '20px'}} >{user.email}</span>
              <Avatar style={{backgroundColor: "#348FD9"}} size={38} icon={<UserOutlined />} />
            </Col>
          ) : (
            <Col>
              <Link style={{marginRight: '20px'}} to="/login">Iniciar sesión</Link>
              <Avatar size={38} icon={<UserOutlined />} />
            </Col>
          )}
          <Col style={{marginLeft: '30px'}}>
            <Link to="/cart-store" >
              <Avatar style={{cursor: 'pointer', backgroundColor: '#348FD9'}} size={38} icon={<ShoppingCartOutlined /> } />
            </Link>
          </Col>
        </div>
       </Layout.Header>
    )
}

export default Header
