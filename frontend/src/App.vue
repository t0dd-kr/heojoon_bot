<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted: function () {
      document.getElementsByTagName('meta')[2].setAttribute('content','width=640px,max-scale=1.0,user-scalable=no')
    },
  }
</script>

<style lang="scss" scoped>
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

  html, body, textarea, input, select, pre, div {
    font-family: 'NanumSquare', sans-serif !important;
    margin: 0;
  }
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
