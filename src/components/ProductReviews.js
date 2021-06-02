import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/ProductReviews.module.css'
import { Row, Rate , Comment, Avatar, Form, Button, List, Input } from 'antd';
import imageDefault from '../assets/no-image-xl.png'
import { UserOutlined } from '@ant-design/icons';
import { getProductReview } from '../services/index'
import { MarketContext } from '../context'

const { TextArea } = Input 

const Review = ({review}) => 
  <div>
    <Rate disabled={true} value={review.calificacion} />
    <p>{review.resena}</p>
  </div>

const CommentList = ({ reviews }) => (
  <List
    dataSource={reviews}
    header={`${reviews.length} ${reviews.length > 1 ? 'Reseñas' : 'Reseña'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, isLogin, user}) => (
  <Form className={styles.formReview}>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button disabled={!(isLogin && user.email)} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Preguntar
      </Button>
    </Form.Item>
  </Form>
);

const ProductReviews = ({product}) => {
  const { user, isLogin } = useContext(MarketContext)
  const [ reviews, setReviews ] = useState([])
  const [ submitting, setSubmitting ] = useState(false)
  const [ value, setValue ] = useState('')

  useEffect(async () => {
    const data = await getProductReview({ id: product.idProducto})
    const tempReviews = [...reviews]
    console.log(data)
    if(data.data.length > 0){
      data.data.forEach(q => {
        const userQuest = q.usuario.correo
        tempReviews.push({
          author: userQuest.correo,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <Review review={q} />,
        })
      })
      setReviews(tempReviews)
    }

  }, [])

  const handleSubmit = () => {
    if(isLogin && user.email){
      const questionData = {
        usuarioPreg: user.email,
        pregunta: value,
      }
      setReviews([...reviews, { 
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
    <Row className={styles.rowReviews}>
    {reviews.length > 0 && <CommentList reviews={reviews} />}
      {/* <Comment
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
            isLogin
            user
          />
        }
      /> */}
    </Row>
  )
}

export default ProductReviews
