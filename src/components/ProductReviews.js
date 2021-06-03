import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/ProductReviews.module.css'
import { Row, Rate , Comment, Avatar, Form, Button, List, Input } from 'antd';
import imageDefault from '../assets/no-image-xl.png'
import { PlusOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { getProductReview } from '../services/index'
import { MarketContext } from '../context'

const { TextArea } = Input 

const Review = ({review}) => 
  <div>
    <Rate disabled={true} value={review.calificacion} />
    <p>{review.resena}</p>
  </div>

const CommentList = ({ reviews, handleShowForm, showForm }) => (
  <List
    style={{width: "100%"}}
    dataSource={reviews}
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
        <span className={styles.listTitle}>{`${reviews.length} ${reviews.length > 1 ? 'Reseñas' : 'Reseña'}`}</span>
      </Row>}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, isLogin, user}) => (
  <Form onFinish={onSubmit} className={styles.formReview}>
    <Form.Item name="rate" >
      <Rate/>
    </Form.Item>
    <Form.Item name="review" >
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button disabled={!isLogin} htmlType="submit" loading={submitting} type="primary">
        Enviar
      </Button>
    </Form.Item>
  </Form>
);

const ProductReviews = ({product}) => {
  const { user, isLogin } = useContext(MarketContext)
  const [ reviews, setReviews ] = useState([])
  const [ submitting, setSubmitting ] = useState(false)
  const [ value, setValue ] = useState('')
  const [ showForm, setShowForm ] = useState(false)

  useEffect(async () => {
    const data = await getProductReview({ id: product.idProducto})
    const tempReviews = [...reviews]
    if(data.data.length > 0){
      data.data.forEach(q => {
        const userQuest = q.usuario.correo
        tempReviews.push({
          author: userQuest.correo,
          avatar: <Avatar style={{backgroundColor: "#FFCE22"}} size={32} icon={<UserOutlined />} />,
          content: <Review review={q} />,
        })
      })
      setReviews(tempReviews)
    }

  }, [])

  const handleSubmit = (values) => {
    if(isLogin && user.email){
      console.log(values)
      console.log(user)
      console.log(product)
    }
    // if(isLogin && user.email){
    //   const questionData = {
    //     usuarioPreg: user.email,
    //     pregunta: value,
    //   }
    //   setReviews([...reviews, { 
    //     author: user.email,
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     content: <p>{value}</p>,
    //   }])
    //   setValue('')
    // }
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Row className={styles.rowReviews}>
    {reviews.length > 0 && <CommentList handleShowForm={handleShowForm} showForm={showForm} reviews={reviews} />}
    {showForm && (
      <Comment
        className={styles.reviewsWrap}
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
            user
          />
        }
      />
    )}
    </Row>
  )
}

export default ProductReviews
