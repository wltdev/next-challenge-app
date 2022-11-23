import api from '@/utils/api'
import { setLocalUser, setUserToken, logout } from '@/utils/localStorage'

export const login = async({ email, password }) => {
  const { data } = await api.post('/signin', { email, password })

  setUserToken(data.access_token)
  setLocalUser(data.user)

  return data.user
}

export const signOut = () => logout()
