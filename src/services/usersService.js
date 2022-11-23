import api from '@/utils/api'

export const getUsers = async ({ lastPage, limit }) => {
  const { data } = await api.get('/users')

  return data
}

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export const getUser = async (id) => {
  const { data } = await api.get(`/users/${id}`)

  return data
}
