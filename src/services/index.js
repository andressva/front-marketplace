import axios from 'axios'

const axiosHttp = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const login = ({ correo, clave }) => {
  return new Promise((resolve, reject) => {
    axiosHttp.post('/login', {correo, clave})
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const loadProducts = () => {
  return new Promise((resolve, reject) => {
    axiosHttp.get('/producto/T/1')
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || []})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}

export const getProduct = ({id}) => {
  return new Promise((resolve, reject) => {
    axiosHttp.get(`/producto/P/${id}`)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}