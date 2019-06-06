<template>
  <div class="side-nav">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="$store.state.isCollapse"
      :router="true"
    >
      <el-submenu :index="(index + 1).toString()" v-for="(item, index) in navSide" :key="item.id">
        <template slot="title">
          <i :class="item.icon || 'el-icon-location'"></i>
          <span slot="title">{{item.name || '主菜单'}}</span>
        </template>
        <template v-if="item.children">
          <el-menu-item-group>
            <!-- <span slot="title">{{ i.name || '下级菜单' }}</span> -->
            <el-menu-item v-for="(i,idx) in item.children" :key="idx" :index="i.path">{{i.name|| '下级菜单'}}</el-menu-item>
          </el-menu-item-group>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    let vm = this
    return {
      isCollapse: false,
      path: vm.$route.fullPath
    }
  },
  created() {},
  computed: {
    navSide: {
      get() {
        let vm = this
        let reg = /^\/([a-zA-Z]+)\//

        if (!reg.exec(vm.path)) {
          return []
        }
        let str = reg.exec(vm.path)[1]
        return this.$store.state.nav.navSide[0].children.filter(item => {
          return item.path.indexOf(str) >= 0
        })[0].children
      },
      set() {}
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss'>
.side-nav {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item {
    font-size: 14px;
    color: #5f5f5f;
    // text-align: right;
    padding-left: 60px !important;
  }
  .el-submenu__title {
    padding-left: 0 !important;
  }
}
</style>