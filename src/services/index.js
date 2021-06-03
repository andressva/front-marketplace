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
    axiosHttp.get('/producto/A/0')
      .then(resp => {
        console.log(resp)
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

export const getProductQuestions = ({id}) => {
  return new Promise((resolve, reject) => {
    axiosHttp.get(`/pregunta/${id}`)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}

export const getProductReview = ({id}) => {
  return new Promise((resolve, reject) => {
    axiosHttp.get(`/resena/${id}`)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axiosHttp.get(`/cat`)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}

export const getStores = () => {
  return new Promise((resolve, reject) => {
    axiosHttp.get(`/tienda`)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}

export const postReview = (body) => {
  return new Promise((resolve, reject) => {
    axiosHttp.post(`/resena`, body)
      .then(resp => {
        resolve({ status: true, data: resp.data.objResponse || {}})
      })
      .catch(err => {
        reject({ status: false, data: err })
      })
  })
}