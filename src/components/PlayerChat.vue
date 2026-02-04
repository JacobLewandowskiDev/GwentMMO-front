<script>
import { inputMode } from '@/logic/inputMode';

export default {

  props: ['playerSocket', 'playerUsername'],

  data() {
      return {
      chatMessage: "",
      messages: [],
      peek: false,
      peekTimeout: null 
      }
  },

  mounted() {
    if (!this.playerSocket) return;

    this.playerSocket.subscribe("/topic/chat", (message) => {
        const msgObj = JSON.parse(message.body);

        if (!msgObj.playerUsername) {
            // System message (join/left the game)
            this.messages.push({ system: true, text: msgObj.playerMessage });
        } else {
            // Player message
            this.messages.push({
                system: false,
                username: msgObj.playerUsername,
                message: msgObj.playerMessage,
                color: this.getUsernameColor(msgObj.playerUsername)
            });
        }

        this.scrollToBottom();

        if (inputMode.mode !== 'CHAT') {
            this.triggerPeek();
        }
    });
  },

  computed: {
    chatOpen() {
      return inputMode.mode === 'CHAT';
    }
  },

  methods: {
    showChat() {
      inputMode.mode = inputMode.mode === 'CHAT' ? 'GAME' : 'CHAT';
    },

    sendMessage() {
      const msg = this.chatMessage.trim();
      if (!msg || !this.playerSocket) return;

      const payload = {
          playerUsername: this.playerUsername,
          playerMessage: msg
      };

      this.playerSocket.send("/app/chat", {}, JSON.stringify(payload));

      this.chatMessage = "";
    },

    getUsernameColor(username) {
      let hash = 0;
      for (let i = 0; i < username.length; i++) {
          hash = username.charCodeAt(i) + ((hash << 5) - hash);
      }

      const hue = Math.abs(hash) % 360;
      return `hsl(${hue}, 70%, 60%)`;
    },

    scrollToBottom() {
      this.$nextTick(() => {
          const chat = this.$el.querySelector(".playerChat__chatSection");
          if (chat) chat.scrollTop = chat.scrollHeight;
      });
    },

    triggerPeek() {
    this.peek = true;

      if (this.peekTimeout) clearTimeout(this.peekTimeout);

      this.peekTimeout = setTimeout(() => {
        this.peek = false;
      }, 3000);
    }
  }
}
</script>

<template>
 <div :class="['playerChat', { 'playerChat--open': chatOpen || peek }]">
  <div class="playerChat__chatSection" v-if="chatOpen || peek">
    <div v-for="(msg, index) in messages" :key="index" class="chat-message">
      <span v-if="msg.system" class="chat-message--system">
          {{ msg.text }}
      </span>
      <span v-else>
          <span class="chat-username" :style="{ color: msg.color }">
              {{ msg.username }}
          </span>
          <span class="chat-separator">:</span>
          <span class="chat-text">
              {{ msg.message }}
          </span>
      </span>
    </div>
  </div>


    <div class="playerChat__button">
      <svg @click="showChat()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path
          d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/>
      </svg>

      <input v-if="chatOpen" type="text" maxlength="34" placeholder="Type a message..." v-model="chatMessage" @keyup.enter="sendMessage"/>

      <svg v-if="chatOpen" class="playerChat__button__send"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" :fill="chatMessage.trim() ? '#2dde96' : 'gray'" :style="{ cursor: chatMessage.trim() ? 'pointer' : 'not-allowed' }"
        @click="chatMessage.trim() && sendMessage()">
            <path d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z"/>
        </svg>
    </div>
  </div>
</template>

<style scoped>
.playerChat {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  max-width: 30rem;
  min-width: 15rem;
  height: 20rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
}

.playerChat--open {
  background: rgba(0, 0, 0, 0.75);
}

.playerChat__chatSection {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #2dde96 transparent;
}

.playerChat__chatSection::-webkit-scrollbar {
  width: .5rem;
}

.playerChat__chatSection::-webkit-scrollbar-track {
  background: transparent;
}

.playerChat__chatSection::-webkit-scrollbar-thumb {
  background-color: #2dde96;
  border-radius: 3px;
  border: none;
}

.playerChat__chatSection::-webkit-scrollbar-button {
  display: none;
}

.playerChat__button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.playerChat__button svg:first-child {
  width: 3rem;
  height: auto;
  fill: #2dde96;
  cursor: pointer;
  transition: fill 0.2s ease;
}

.playerChat__button svg:first-child:hover {
  fill: #32f5a7;
}


.playerChat__button input {
  flex: 1;
  min-width: 15rem;
  max-width: 24rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #2dde96;
  outline: none;
  background: rgb(0, 0, 0);
  color: white;
  font-size: 1rem;
  transition: border 0.2s ease, 0.2s ease;
}

.playerChat__button input:focus {
  border-color: #26f7a3;
  background: rgba(255, 255, 255, 0.15);
}

.playerChat__button__send {
    flex: .2;
    rotate: 45deg;
    cursor: pointer;
    scale: .5;
    transition: fill 0.2s ease;
}

.chat-message {
  margin-bottom: 0.25rem;
  word-break: break-word;
}

.chat-username {
  font-weight: 600;
}

.chat-separator {
  margin-right: 0.25rem;
}

.chat-text {
  color: white;
}

.chat-message--system {
  color: #aaaaaa;
  font-style: italic;
}

</style>
