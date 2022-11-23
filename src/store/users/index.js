import {
  SET_DOCS,
  SET_DOC,
  SET_ACTION_LOADING,
  SET_TEMPLATE_LOADING,
  RESET_DOC,
  SET_ITEMS,
  INCREMENT_PAGE,
  DECREMENT_PAGE
} from './mutations'
import { actions } from './actions'

export default {
  namespaced: true,
  state: {
    page: 1,
    lastPage: 1,
    limit: 10,
    docs: [],
    items: [], // shown on table
    filter: '',
    doc: {},
    actionLoading: false,
    templateLoading: false
  },

  getters: {
    getDoc: (state) => state.doc,
    getDocs: (state) => state.docs,
    getItems: (state) => state.items,
    getPage: (state) => state.page,
    isLoading: (state) => state.actionLoading
  },

  mutations: {
    [SET_DOCS](state, { docs, nextPageToken, lastPage }) {
      state.docs = state.docs.concat(docs)
      state.nextPageToken = nextPageToken
      state.lastPage = lastPage
    },
    [SET_ITEMS](state, items) {
      state.items = items
    },
    [INCREMENT_PAGE](state) {
      state.page += 1
    },
    [DECREMENT_PAGE](state) {
      state.page -= 1
    },
    [SET_DOC](state, doc) {
      state.doc = doc
    },
    [SET_ACTION_LOADING](state, value) {
      state.actionLoading = value
    },
    [SET_TEMPLATE_LOADING](state, value) {
      state.templateLoading = value
    },
    [RESET_DOC](state) {
      state.doc = {}
    }
  },

  actions
}
