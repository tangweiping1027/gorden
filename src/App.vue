<template>
  <div id="app">
    <router-view/>
    <!-- <ElButton type="primary" @click="handleClick1">按钮1</ElButton>
    <ElButton type="primary" @click="handleClick2">按钮2</ElButton>-->
  </div>
</template>

<script>
// let glob = window
// import './aaa'
import storage from 'Utils/storage'
export default {
  name: 'app',
  mounted() {
    let obj = undefined

    this.$ajax
      .post('http://120.79.124.232:8001/mock/36/logistic/forwarder/page', {})
      .then(data => {
        console.log(data)
      })
  }
  // methods: {
  //   handleClick1() {\
  //     glob.alert(glob.getMessage())
  //   },
  //   handleClick2() {
  //     glob.JavaScriptInterface.tipMessage(data => {
  //       glob.alert(data)
  //     })
  //   }
  // }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,
html,
#app {
  height: 100%;
}
body {
  margin: 0;
}
</style>
