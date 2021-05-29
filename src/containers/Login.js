import React from 'react'
import { Row, Col, Layout} from 'antd'

const Login = () => {
    return (
        <Layout style={{height: "100vh"}}>
        <Layout.Content>
        <Row justify="center" align="middle" style={{height: "100%"}}>
            <Col >
                <div style={{width: "200px", height: "400px", backgroundColor: "red"}}></div>
            </Col>
        </Row>
        </Layout.Content>
        </Layout>
    )
}

export default Login
