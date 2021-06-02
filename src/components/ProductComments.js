import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/ProductComment.module.css'
import { Row, Col, Comment, Avatar, Form, Button, List, Input } from 'antd';
import imageDefault from '../assets/no-image-xl.png'
import { UserOutlined } from '@ant-design/icons';
import { getProductQuestions } from '../services/index'
import { MarketContext } from '../context'

const { TextArea } = Input 

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'Preguntas' : 'Pregunta'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, isLogin, user}) => (
  <Form className={styles.formComment}>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button disabled={!isLogin} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Preguntar
      </Button>
    </Form.Item>
  </Form>
);

const ProductComments = ({product}) => {
  const { user, isLogin } = useContext(MarketContext)
  const [ comments, setComments ] = useState([])
  const [ submitting, setSubmitting ] = useState(false)
  const [ value, setValue ] = useState('')

  useEffect(async () => {
    const data = await getProductQuestions({ id: product.idProducto})
    const tempComments = [...comments]
    if(data.data.length > 0){
      data.data.forEach(q => {
        const userQuest = q.usuarioPreg
        const userResp = q.usuarioResp
        tempComments.push({
          author: userQuest.correo,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{q.pregunta}</p>,
        })
      })
      setComments(tempComments)
    }

  }, [])

  const handleSubmit = () => {
    if(isLogin && user.email){
      const questionData = {
        usuarioPreg: user.email,
        pregunta: value,
      }
      setComments([...comments, { 
        author: user.email,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{value}</p>,
      }])
      setValue('')
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Row className={styles.rowComments}>
    {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        className={styles.commentWrap}
        avatar={
          <Avatar size={38} icon={<UserOutlined />} />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            isLogin={isLogin}
          />
        }
      />
    </Row>
  )
}

export default ProductComments
