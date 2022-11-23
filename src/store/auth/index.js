import { SET_USER, SET_USER_ERROR } from './mutations'
import { actions } from './actions'

export default {
  namespaced: true,
  state: {
    user: {},
    isLogged: false,
    actionLoading: false,
    error: '',
    isActiveLoginModal: false
  },

  getters: {
    getUser: (state) => state.user,
    getError: (state) => state.error
  },

  mutations: {
    [SET_USER](state, data) {
      state.user = data
      state.isLogged = true
    },
    [SET_USER_ERROR](state, error) {
      state.error = error
    }
  },

  actions
}
