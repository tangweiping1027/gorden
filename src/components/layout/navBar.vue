<template>
  <div class="nav-bar">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#404040"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <a href="/controller">控制中心</a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-location"></i>
        <a href="/message">消息中心</a>
      </el-menu-item>
      <el-menu-item index="4">
        <a>订单管理</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: '1'
    }
  },
  created() {
    // console.log(this.$attrs)
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss'>
.nav-bar {
  position: absolute;
  right: 0;
  .is-active {
    border: none !important;
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .nav-bar {
    border: none;
  }
}
</style>