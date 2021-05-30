import React from 'react'
import { Layout } from 'antd'
import styles from '../styles/containers/Home.module.css'

// Components
import Header from '../components/Header' 
import Footer from '../components/Footer' 
import ProductList from '../components/ProductList'

const Home = () => {
    return (
        <Layout style={{height: '100vh'}}>
            <Header/>
            <Layout.Content className={styles.container}>
                <div className={styles.leftColumn}>
                    <h2>Filtros</h2>
                </div>
                <div className={styles.rightColumn}>
                    <ProductList/>
                </div>
            </Layout.Content>
            <Footer/>
        </Layout>
    )
}

export default Home
