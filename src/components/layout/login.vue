<template>
  <div class="t-login">
    <ElRow style="height: 40px">
      <ElCol :span="24">
        <ElForm :model="form" size="small" label-width="50px">
          <t-form-item :value.sync="form.account" prop="account" label="账号:"></t-form-item>
          <t-form-item :value.sync="form.password" type="password" prop="password" label="密码:"></t-form-item>
          <t-form-item type="btn" btnText="登录" @click="handleLogin" label-width="0"></t-form-item>
        </ElForm>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      let vm = this
      vm.$router.push({
        path: '/controller/manager/person/'
      })
      // if (vm.form.account == 'admin' && vm.form.password == 'admin') {
      //   vm.$router.push({
      //     path: vm.redirect || '/'
      //   })
      // } else {
      //   vm.$message.error('输入的账号密码有误')
      // }
    }
  }
}
</script>

<style lang='scss'>
.t-login {
  background: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>