export const state = () => ({
  user: {}
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  SOCKET_newMessage(context, data) {
    console.log('Message received', data)
  }
}
