import { login, signOut, update } from '@/services/authService'
import { SET_USER, SET_USER_ERROR } from './mutations'

export const actions = {
  setUser: async ({ commit }, user) => {
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      commit(SET_USER, user)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  },

  signIn: async ({ commit }, { email, password }) => {
    commit(SET_USER_ERROR, '')
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      const user = await login({ email, password })
      commit(SET_USER, user)
      return user
    } catch (error) {
      commit(SET_USER_ERROR, ' E-mail ou senha incorretos. Tente novamente.')
      throw Error('user_incorret_info')
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  },

  updateProfile: async({ commit }, payload) => {
    commit(SET_USER_ERROR, '')
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      const user = await update(payload)
      commit(SET_USER, user)
      return user
    } catch (error) {
      commit(SET_USER_ERROR, error)
      throw error
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  },

  signOut: async ({ commit }) => {
    commit(SET_USER, {})
    signOut()
  }
}
