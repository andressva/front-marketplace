import React, { useState, useContext } from 'react'
import { Image, Layout, Avatar, Col } from 'antd'
import styles from '../styles/components/Header.module.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { UserOutlined } from '@ant-design/icons';
import { MarketContext } from '../context'

const Header = () => {
    const { user } = useContext(MarketContext)
    return (
       <Layout.Header className={styles.container}>
         <Image
          width={200}
          src={logo}
        />
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
       </Layout.Header>
    )
}

export default Header
