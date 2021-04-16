export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = []
  },
  addMessage(state, message)  {
    state.messages.push(message)
  },
  updateUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  SOCKET_newMessage({ commit }, message) {
    commit("addMessage", message)
  },
  SOCKET_updateUsers({commit}, users) {
    commit("updateUsers", users)
  }
}

