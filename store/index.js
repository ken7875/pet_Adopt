export const state = () => ({
  top: 18
})

export const actions = {
  addTop ({ commit }, payload) {
    commit('addTopNum', payload)
  }
}

export const mutations = {
  addTopNum (state, payload) {
    state.top += payload
  }
}

export const getters = {
}
