import api from '@/utils/api'
import { setLocalUser, setUserToken, logout } from '@/utils/localStorage'

export const login = async({ email, password }) => {
  const { data } = await api.post('/signin', { email, password })

  setUserToken(data.access_token)
  setLocalUser(data.user)

  return data.user
}

export const update = async(payload) => {
  const { data } = await api.put('/profile', payload)

  setLocalUser(data)

  return data
}

export const signOut = () => logout()
