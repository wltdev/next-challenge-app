import { createStore } from 'vuex'
import auth from './auth'
import users from './users'

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: '',
    isRTL: false,
    mcolor: '',
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    globalLoading: false,
    appConfig: {}
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig
    },
    navbarMinimize(state) {
      const sidenavShow = document.querySelector('.g-sidenav-show')
      const sidenav = document.getElementById('sidenav-main')

      if (sidenavShow.classList.contains('g-sidenav-pinned')) {
        sidenavShow.classList.remove('g-sidenav-pinned')
        setTimeout(function () {
          sidenav.classList.remove('bg-white')
        }, 100)
        sidenav.classList.remove('bg-transparent')
        state.isPinned = true
      } else {
        sidenavShow.classList.add('g-sidenav-pinned')
        sidenav.classList.add('bg-white')
        sidenav.classList.remove('bg-transparent')
        state.isPinned = false
      }
    },
    sidebarType(state, payload) {
      console.log(payload)
      state.isTransparent = payload
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true
      } else {
        state.isNavFixed = false
      }
    },
    SET_GLOBAL_LOADING: (state, value) => {
      state.globalLoading = value
    },
    SET_APP_CONFIG: (state, config) => {
      state.appConfig = config
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit('sidebarType', payload)
    },
    setGlobalLoading({ commit, state }, value) {
      commit('SET_GLOBAL_LOADING', value)
    },
    setAppConfig: ({ commit }, payload) => {
      commit('SET_APP_CONFIG', payload)
    }
  },
  getters: {
    getGlobalLoading: (state) => state.globalLoading,
    getAppConfig: (state) => state.appConfig
  },
  modules: {
    auth,
    users
  }
})
