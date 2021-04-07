<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>

      <v-btn @click="message">
        NEW MESSAGE
      </v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("Client IO connected")
    }
  },
  methods: {
    message() {
      this.$socket.client.emit('createMessage', {
        text: "FROM CLIENT"
      })
    }

  }
}
</script>
