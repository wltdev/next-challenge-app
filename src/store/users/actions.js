import {
  SET_DOCS,
  SET_DOC,
  RESET_DOC,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_ITEMS,
  SET_ACTION_LOADING
} from './mutations'

import { getUsers, updateUser, getUser } from '@/services/usersService'

export const actions = {
  setDocs: async ({ commit, state }) => {
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      const { page, limit, search } = state
      const docs = await getUsers({ page, limit, search })
      commit(SET_DOCS, {
        docs,
        lastPage: 1
      })
      commit(SET_ITEMS, docs)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  },

  prevPage: async ({ commit, state }) => {
    const { page, docs, limit } = state
    const pagination = limit

    if (page > 1) {
      const prev = page - 1
      const idx = prev * pagination
      const items = docs.slice(idx - pagination, idx)

      console.log({ idx, docs, items })

      commit(DECREMENT_PAGE)
      commit(SET_ITEMS, items)

      return items
    }
  },

  nextPage: async ({ commit, dispatch, state }) => {
    const { page, lastPage, docs, limit, search } = state
    const pagination = limit

    const next = page + 1
    if (next <= lastPage) {
      const idx = page * pagination
      const items = docs.slice(idx, idx + pagination)

      commit(INCREMENT_PAGE)
      commit(SET_ITEMS, items)
      return items
    }

    if (next > lastPage) {
      commit(SET_ACTION_LOADING, true)
      try {
        const docs = await getUsers({ page: next, limit, search })

        if (docs.length) {
          commit(INCREMENT_PAGE)
          commit(SET_DOCS, {
            docs,
            lastPage: next
          })

          commit(SET_ITEMS, docs)
        }

        commit(SET_ACTION_LOADING, false)

        return []
      } catch (error) {
        console.log(error)
        // dispatch('app/showError', { error }, { root: true })
        commit(SET_ACTION_LOADING, false)
      }
    }
    return []
  },

  setDoc: async ({ commit }, data) => {
    try {
      commit(SET_DOC, data)
    } catch (error) {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
      throw error
    }
  },

  getDocByUid: async ({ commit }, uid) => {
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      const doc = await getUser(uid)
      commit(SET_DOC, doc)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  },

  resetDoc: ({ commit }) => commit(RESET_DOC),

  updateDoc: async ({ commit, state }, payload) => {
    const { doc, docs, items } = state
    commit('SET_GLOBAL_LOADING', true, {
      root: true
    })
    try {
      await updateUser(doc._id, payload)

      const newData = { ...doc, ...payload }

      for (let i = 0; i < docs.length; i++) {
        if (docs[i]._id === doc._id) {
          docs[i] = newData
          break
        }
      }
      for (let i = 0; i < items.length; i++) {
        if (items[i]._id === doc._id) {
          items[i] = newData
          break
        }
      }

      commit(SET_ITEMS, items)
      commit(SET_DOCS, docs)
      commit(SET_DOC, newData)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      commit('SET_GLOBAL_LOADING', false, {
        root: true
      })
    }
  }
}
