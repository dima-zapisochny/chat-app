export const state = () => ({
  user: {},
  messages: []
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {};
    state.messages = []
  },
  addMessage(state, message)  {
    state.messages.push(message)
  }
}

export const actions = {
  SOCKET_newMessage({ commit }, message) {
    commit("addMessage", message)
  }
}

