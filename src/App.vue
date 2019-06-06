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
export default {
  name: 'app',
  mounted() {
    console.log(this.glob)
  }
  // methods: {
  //   handleClick1() {
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
