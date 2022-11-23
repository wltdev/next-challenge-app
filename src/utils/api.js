import axios from 'axios'
import { logout, getToken } from './localStorage'

const env = import.meta.env

const API_URL = env.VITE_API_URL || 'http://localhost:3333' // dev

const fetch = () => {
  const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(async (response) => {
    const token = await getToken()
    response.headers.Authorization = token ? `Bearer ${token}` : ''
    return response
  })

  instance.interceptors.response.use(
    async (response) => response,
    (error) => {
      if (!error) logout()

      const { status } = error.response
      if (status && status === 401) logout()

      if (error.response) {
        const { errors } = error.response.data
        if (errors) throw errors
      }

      return error
    }
  )

  return instance
}

export default fetch()
