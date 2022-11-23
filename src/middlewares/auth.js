// import { api } from '@/utils/api'
import { getLocalUser } from '@/utils/localStorage'
import router from '../router'
import store from '../store'

const authMiddleware = async () => {
  store.dispatch('setGlobalLoading', true)
  const localUser = await getLocalUser()

  if (localUser) {
    store.dispatch('auth/setUser', localUser)
    router.push({ name: 'users' })
  } else {
    router.push('/sign-in')
  }

  store.dispatch('setGlobalLoading', false)
}

authMiddleware()
