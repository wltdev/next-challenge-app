const LOCAL_USER = '@app-user'
const LOCAL_TOKEN = '@app-token'

export const setLocalUser = (user) =>
  window.localStorage.setItem(LOCAL_USER, JSON.stringify(user))

export const setUserToken = (token) =>
  window.localStorage.setItem(LOCAL_TOKEN, token)

export const getLocalUser = () => JSON.parse(window.localStorage.getItem(LOCAL_USER))
export const getToken = async () => window.localStorage.getItem(LOCAL_TOKEN)

export const logout = () => {
  window.localStorage.removeItem(LOCAL_USER)
  window.localStorage.removeItem(LOCAL_TOKEN)
}
