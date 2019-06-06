<template>
  <div class="vue-wrap">
    <el-container>
      <el-header>
        <navBar/>
      </el-header>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import navBar from './navBar'
export default {
  components: {
    navBar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.vue-wrap {
  height: 100%;
}

.el-header {
  height: 64px !important;
  display: flex;
  justify-content: space-between;
  background-color: #404040;
  border-bottom: solid 1px #e6e6e6;
  .switch-icon {
    font-size: 23px;
    cursor: pointer;
  }
}
</style>
