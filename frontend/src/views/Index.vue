<template lang="html">
  <div class="index">
    <div class="body">
      <div class="background-image"></div>
      <div class="heojoon">
        <img src="../assets/heojoon.png" alt="">
      </div>
      <div class="container-input">
        <div class="input-title">
          이름
        </div>
        <div class="input">
          <input type="text" name="" v-model="nickname">
        </div>
        <div :class="'btn-confirm' + (nickname ? ' btn-confirm-active' : '')" @click="saveNickname">
          입장
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nickname: '',
    }
  },
  methods: {
    saveNickname: function () {
      if(!this.nickname) {
        $('.heojoon').toggleClass('shake')
        setTimeout(() => {
          $('.heojoon').toggleClass('shake')
        }, 1000)
        return
      }
      window.localStorage.nickname = this.nickname
      window.localStorage.visit = 1
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="scss" scoped>
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
    padding: 50px 0;
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
  .heojoon {
    width: 300px;
    height: 300px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    -webkit-box-shadow: 10px 14px 25px 1px rgba(0,0,0,0.7);
    -moz-box-shadow: 10px 14px 25px 1px rgba(0,0,0,0.7);
    box-shadow: 10px 14px 25px 1px rgba(0,0,0,0.7);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    &.shake {
      @keyframes shake {
        10%, 90% {
          transform: translate3d(-2px, 0, 0);
        }

        20%, 80% {
          transform: translate3d(4px, 0, 0);
        }

        30%, 50%, 70% {
          transform: translate3d(-8px, 0, 0);
        }

        40%, 60% {
          transform: translate3d(8px, 0, 0);
        }
      }
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
    & img {
      width: 100%;
      height: 100%;
    }
  }
  .container-input {
    margin-top: 50px;
  }
  .input-title {
    font-size: 30px;
    font-weight: 600;
  }
  .input {
    margin-top: 12px;
    & input {
      width: 300px;
      padding: 15px;
      font-size: 24px;
      outline: none;
      border: 3px solid #aaa;
      border-radius: 5px;
      &:focus {
        border: 3px solid #80000b;
      }
    }
  }
  .btn-confirm {
    border: 3px solid #555;
    background-color: #555;
    color: #fff;
    margin-top: 15px;
    display: inline-block;
    width: 300px;
    padding: 15px;
    font-size: 24px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    &-active {
      border: 3px solid #80000b;
      background-color: #80000b;
    }
  }
</style>
