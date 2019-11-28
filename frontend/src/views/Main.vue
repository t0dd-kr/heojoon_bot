<template>
  <div class="index">
    <div class="body">
      <div class="background-image"></div>
      <div class="bot-profile">
        <div class="bot-profile-image">
          <img src="../assets/heojoon.png" alt="">
        </div>
        <div class="bot-profile-nickname">
          허준Bot
        </div>
      </div>
      <div class="chat" @click.stop="focusInput">
        <div class="chat-flex">
          <div class="chat-row" v-for="chat in chats" :style="'text-align: ' + (chat.isBot ? 'left' : 'right')">
            <div class="chat-bot-el" v-if="chat.isBot">
              <div class="chat-content">
                <div class="chat-content-image">
                  <img :src="chat.image" alt="" v-if="chat.image">
                </div>
                {{chat.content}}
              </div>
              <div class="chat-date">
                {{dateString(chat.date)}}
              </div>
            </div>
            <div class="chat-user-el" v-else>
              <div class="chat-date">
                {{dateString(chat.date)}}
              </div>
              <div class="chat-content">
                {{chat.content}}
              </div>
            </div>
          </div>
          <div class="chat-row" v-if="optionList.length > 0">
            <div class="chat-user-el">
              <div class="button-input">
                <div class="button-el" v-for="option in optionList" @click.stop="clickOption(option)">
                  {{option.label}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-input">
        <div class="text-input">
          <input type="text" name="" v-model="userChat" :placeholder="placeholder" @keydown="($event) => { if ($event.keyCode === 13) { sendChat() } }">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="535.5px" height="535.5px" viewBox="0 0 535.5 535.5" style="enable-background:new 0 0 535.5 535.5;" xml:space="preserve" @click="sendChat">
          	<!-- <g id="send">
          		<polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"/>
          	</g> -->
            <g>
          		<path d="M256,0C114.848,0,0,114.848,0,256v240c0,8.832,7.168,16,16,16h240c141.152,0,256-114.848,256-256S397.152,0,256,0z
          			 M272,320H144c-8.832,0-16-7.168-16-16c0-8.832,7.168-16,16-16h128c8.832,0,16,7.168,16,16C288,312.832,280.832,320,272,320z
          			 M368,224H144c-8.832,0-16-7.168-16-16c0-8.832,7.168-16,16-16h224c8.832,0,16,7.168,16,16C384,216.832,376.832,224,368,224z"/>
          	</g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted: function () {
    document.getElementsByTagName('meta')[2].setAttribute('content','width=640px,max-scale=1.0,user-scalable=no')
  },
  data () {
    return {
      rewelcome: [''],
      placeholder: '현재 증상을 말해주세요. (예: 딸꾹질)',
      userChat: '',
      sessionId: '',
      chatflowId: '',
      insId: '',
      paramId: '',
      optionList: [],
      chats: []
    }
  },
  mounted: function () {
    if(!window.localStorage.visit || window.localStorage.visit < 2) {
      this.$http.post('/api/connect')
      .then(res => {
        console.log(res.data.data)
        this.chatflowId = res.data.chatflow_id
        this.sessionId = res.data.session_id
        this.insId = res.data.ins_id
        let welcomeMsgs = res.data.welcome.slice(1)
        for(let i=0;i<welcomeMsgs.length;i++) {
          this.chats.push({
            isBot: true,
            content: welcomeMsgs[i].message.replace('@name', window.localStorage.nickname),
            date: new Date()
          })
          this.shake()
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    focusInput: function () {
      $('input').focus()
    },
    clickOption: function (option) {
      this.optionList = []
      this.chats.push({
        isBot: false,
        content: option.label,
        date: new Date()
      })
      this.$forceUpdate()
      this.scrollToBottom()
      this.$http.post('/api/send', {
        msg: option.value,
        session_id: this.sessionId,
        chatflow_id: this.chatflowId,
        param_id: this.paramId,
        ins_id: this.insId,
      })
      .then(res => {
        this.chatflowId = res.data.chatflow_id
        this.sessionId = res.data.session_id
        this.insId = res.data.ins_id
        this.paramId = res.data.param_id
        console.log(res.data.data)
        let response = res.data.response
        for(let i=0;i<response.length;i++) {
          this.chats.push({
            isBot: true,
            image: response[i].imgRoute,
            content: response[i].message.replace('@name', window.localStorage.nickname).replace(' (핑퐁[pingpong.us]에서 생성된 자동답변입니다)', ''),
            date: new Date()
          })
          this.shake()
          if(response[i].optionList && response[i].optionList.length > 1) {
            this.optionList = response[i].optionList
          }
        }
        this.$forceUpdate()
        this.scrollToBottom()
      })
      .catch(err => {
        console.log(err)
      })
    },
    shake: function () {
      $('.bot-profile-image').addClass('shake')
      setTimeout(() => {
        $('.bot-profile-image').removeClass('shake')
      }, 1000)
    },
    dateString: function (date) {
      let d = new Date(date)
      return (d.getHours() < 12 ? '오전 ' : '오후 ') + this.pad(d.getHours(), 2) + ':' + this.pad(d.getMinutes(), 2)
    },
    pad: function (n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },
    sendChat: function () {
      if(!this.userChat) return
      this.chats.push({
        isBot: false,
        content: this.userChat,
        date: new Date()
      })
      this.$forceUpdate()
      this.scrollToBottom()
      this.$http.post('/api/send', {
        msg: this.userChat,
        session_id: this.sessionId,
        chatflow_id: this.chatflowId,
        param_id: this.paramId,
        ins_id: this.insId
      })
      .then(res => {
        this.chatflowId = res.data.chatflow_id
        this.sessionId = res.data.session_id
        this.insId = res.data.ins_id
        this.paramId = res.data.param_id
        console.log(res.data.data)
        let response = res.data.response
        for(let i=0;i<response.length;i++) {
          this.chats.push({
            isBot: true,
            image: response[i].imgRoute,
            content: response[i].message.replace('@name', window.localStorage.nickname).replace(' (핑퐁[pingpong.us]에서 생성된 자동답변입니다)', ''),
            date: new Date()
          })
          this.shake()
          if(response[i].optionList && response[i].optionList.length > 1) {
            this.optionList = response[i].optionList
          }
        }
        this.$forceUpdate()
        this.scrollToBottom()
      })
      .catch(err => {
        console.log(err)
      })
      this.userChat = ''
    },
    scrollToBottom: function () {
      setTimeout(() => {
        $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 500, 'swing');
      }, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.index {
  text-align: center;
  height: 100%;
}
.body {
  width: 640px;
  height: 100%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}
.background-image {
  background-image: url(../assets/bg.jpg);
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.3;
}
$img: 80px;
.bot-profile {
  padding: 10px 0;
  background-color: rgba(255,255,255,0.5);
  overflow: hidden;
  display: flex;
  justify-content: center;
  &-image {
    background-color: #fff;
    overflow: hidden;
    border-radius: 50%;
    width: $img;
    height: $img;
    & > img {
      width: $img;
      height: $img;
    }
    display: inline-block;
    -webkit-box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.4);
    -moz-box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.4);
    box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.4);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    &.shake {
      @keyframes shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
          transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
          transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
          transform: translate3d(4px, 0, 0);
        }
      }
      animation: shake 0.40s cubic-bezier(.36,.07,.19,.97) both;
    }
  }
  &-nickname {
    font-size: 28px;
    font-weight: 900;
    margin-left: 10px;
    display: inline-block;
    padding-top: 26px;
  }
  margin-bottom: 30px;
}
.chat {
  height: calc(100% - 150px - 95px);
  width: 580px;
  display: inline-block;
  background-color: rgba(255,255,255,0.5);
  border-radius: 10px;
  overflow-y: scroll;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  &-flex {
    transition: all .25s;
    display: flex;
    flex-flow: column;
    width: calc(100%);
    min-height: 100%;
    justify-content: flex-end;
  }
}
.container-input {
  height: 80px;
  margin-top: 15px;
}
.text-input {
  height: 100%;
  position: relative;
  width: 580px;
  display: inline-block;
  & > input {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    border: none;
    padding: 5px 70px 5px 18px;
    font-size: 26px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    transition: border .25s;
    outline: none;
    z-index: 100;
    &:focus {
      border: 1px solid #262525;
    }
  }
  & > svg {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    & path {
      fill: #84703d;
    }
  }
}
.button-input {
  bottom: 0;
  right: 0;
  padding: 30px;
  box-sizing: border-box;
  width: 400px;
  display: inline-block;
  & .button-el {
    background-color: #4c4533;
    color: #fff;
    font-size: 20px;
    padding: 15px 0;
    text-align: center;
    border-radius: 10px;
    margin: 15px 0;
    cursor: pointer;
    transition: background-color .25s;
    &:hover {
      background-color: #84703d;
    }
  }
}
.chat-row {
  display: block;
  padding: 5px 0;
}
.chat-content {
  &-image > img {
    width: 200px;
    margin-bottom: 5px;
  }
  border-radius: 10px;
  background-color: #fff;
  padding: 15px;
  max-width: 400px;
  display: inline-block;
  position: relative;
  line-height: 28px;
  font-size: 20px;
  // border-bottom: 8px solid #c20011;
  // border-top: 5px solid #e2ae7c;
  // border-right: 1px solid #919094;
  // border-left: 1px solid #919094;
}
.chat-date {
  display: inline-block;
  position: relative;
  top: 10px;
}
.chat-bot-el {
  text-align: left;
  & .chat-content {
    background-color: #80000b;
    color: #fff;
  }
  & .chat-date {
    margin-left: 8px;
  }
  position: relative;
}
.chat-user-el {
  text-align: right;
  & .chat-content {
    background-color: #84703d;
    color: #fff;
  }
  & .chat-date {
    margin-right: 8px;
  }
  position: relative;
}
</style>
