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