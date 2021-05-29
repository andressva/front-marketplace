import React from 'react'
import { Row, Card, Form, Input, Button } from 'antd'
import styles from '../styles/components/LoginForm.module.css'

const CardTitle = () => (
  <Row className={styles.titleWrap} >
    <h4 className={styles.subtitle}>Casual marketplace</h4>
    <h1 className={styles.title} >Inicio de sesión</h1>
  </Row>
)

const handleSubmit = (values) => {
  console.log(values)
}

const LoginForm = () => {
  return (
    <Card className={styles.container} title={<CardTitle />}>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ email: '', password: '' }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Correo electronico"
          name="email"
          rules={[{ required: true, message: 'Porfavor ingresa tu correo electronico!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Porfavor ingresa tu contraseña!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className={styles.btn} type="primary" htmlType="submit" block>
            Inicio de sesion
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginForm
