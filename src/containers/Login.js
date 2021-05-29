import React from 'react'
import { Row, Col, Layout} from 'antd'

// Components
import LoginForm from '../components/LoginForm'

const Login = () => {
    return (
        <Layout style={{height: "100vh"}}>
        <Layout.Content>
        <Row justify="center" align="middle" style={{height: "100%"}}>
            <Col >
                <LoginForm />
            </Col>
        </Row>
        </Layout.Content>
        </Layout>
    )
}

export default Login
