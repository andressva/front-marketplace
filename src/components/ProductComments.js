import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/ProductComment.module.css'
import { Row, Col, Comment, Avatar, Form, Button, List, Input } from 'antd';
import imageDefault from '../assets/no-image-xl.png'
import { UserOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { getProductQuestions } from '../services/index'
import { MarketContext } from '../context'

const { TextArea } = Input 

const CommentList = ({ comments, handleShowForm, showForm }) => (
  <List
    dataSource={comments}
    header={
      <Row className={styles.listHeader}>
        <Button 
          onClick={handleShowForm} 
          type={showForm ? "danger" : "primary"} 
          shape="circle" 
          icon={
            showForm ? (<CloseOutlined />) : (<PlusOutlined />)} 
          size={12} 
        />
        <span className={styles.listTitle}>{`${comments.length} ${comments.length > 1 ? 'Preguntas' : 'Pregunta'}`}</span>
      </Row>}
    itemLayout="horizontal"
    renderItem={item => {
      return (
        <>
          <Comment
            author={item.question.auhtor}
            avatar={
              <Avatar style={{backgroundColor: "#FFCE22"}} size={32} icon={<UserOutlined />} />
            }
            content={
              <p>{item.question.content}</p>
            }
          >
            <Comment
              author={item.answer.auhtor}
              avatar={
                <Avatar style={{backgroundColor: "#3DCF5D"}} size={32} icon={<UserOutlined />} />
              }
              content={
                <p>{item.answer.content}</p>
              }
            />
          </Comment>
        </>
      )
    } }
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
  const [ showForm, setShowForm ] = useState(false)

  useEffect(async () => {
    const data = await getProductQuestions({ id: product.idProducto})
    const tempComments = [...comments]
    if(data.data.length > 0){
      data.data.forEach(q => {
        console.log(q)
        const userQuest = q.usuarioPreg
        const userResp = q.usuarioResp
        tempComments.push({
          question: {
            author: userQuest.correo,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{q.pregunta}</p>,
          },
          answer: {
            author: userResp.correo,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{q.respuesta}</p>,
          }
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

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Row className={styles.rowComments}>
    {comments.length > 0 && <CommentList handleShowForm={handleShowForm} showForm={showForm} comments={comments} />}
    {showForm && (
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
    )}
    </Row>
  )
}

export default ProductComments
