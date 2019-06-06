<template>
  <el-container>
    <el-aside>
      <sideNav/>
    </el-aside>
    <el-main>
      <breadcrumb></breadcrumb>
      <div class="main-container">
        <router-view></router-view>
      </div>
      <div class="left-arrow" @click="$store.commit('changeIsCollapse')">
        <i :class="!$store.state.isCollapse? 'el-icon-caret-left': 'el-icon-caret-right'"></i>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import breadcrumb from './breadcrumb'
import sideNav from './sideNav'
export default {
  data() {
    return {}
  },
  components: {
    breadcrumb,
    sideNav
  }
}
</script>

<style lang='scss'>
.el-container {
  height: 100%;
  background: #f0f2f5;
}
.right-container,
.sidebar {
  transition: all 0.2s ease-in-out;
}
.side-nav {
  height: 100%;
}
.el-aside {
  width: auto !important;
  background: #fff;
  z-index: 10;
  color: #fff;
}
.el-menu {
  height: 100%;
}
.el-main {
  display: flex !important;
  flex-direction: column;
  position: relative;
  .left-arrow {
    position: absolute;
    left: 0;
    top: 40%;
    z-index: 999;
  }
  .main-container {
    height: 100%;
    background: #fff;
    margin-top: 15px;
    border-radius: 3px;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>