import React from 'react'
import { Layout } from 'antd'

// Components
import Header from '../components/Header' 

const Home = () => {
    return (
        <Layout style={{height: '100vh'}}>
            <Header/>
            <Layout.Content>
                Content
            </Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
        </Layout>
    )
}

export default Home
