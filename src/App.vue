<template>
  <div id="app">
    <router-view/>
    <!-- <ElButton type="primary" @click="handleClick1">按钮1</ElButton>
    <ElButton type="primary" @click="handleClick2">按钮2</ElButton>-->
  </div>
</template>

<script>
import storage from 'Utils/storage'
export default {
  name: 'app',
  async mounted() {
    // let obj = undefined

    // this.$ajax
    //   .post('http://120.79.124.232:8001/mock/36/logistic/forwarder/page', {})
    //   .then(data => {
    //     console.log(data)
    //   })
    let vm = this
    await vm.$api['login/login']({
      captcha: '1',
      password: 'admin@123',
      username: 'admin'
    }).then(data => {
      storage.set('login', data.rows.token)
    })
  }
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
