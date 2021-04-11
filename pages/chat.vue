<template>
  <div class="c-wrap">
    <div class="c-chat">
      <message
        v-for="message in messages" :key="message.text"
        :name="message.name"
        :text="message.text"
        :owner="message.id === user.id"
      />
    </div>
    <div class="c-form">
      <chat-form/>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import message from "@/components/message";
import chatForm from "@/components/chatForm";
export default {
  components: {
    message,
    chatForm
  },
  middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  },
  computed: mapState(['user', 'messages'])
}
</script>
<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background-color: #212121;
  }

  .c-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
