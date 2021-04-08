<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="500">
        <v-card-title><h1>Чат</h1></v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Комната"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  layout: 'template',
  head: {
    title: 'Добро пожаловать в наш чат'
  },
  sockets: {
    connect: function() {
      console.log("socket connected")
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Введите имя!',
      v => (v && v.length <= 20) || 'Имя не должно превышать 20 сиволов'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Введите номер комнаты!'
    ]
  }),

  methods: {
    ...mapMutations(['SET_USER']),
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.SET_USER(user);
        this.$router.push("/chat")
      }
    }
  },
}
</script>
