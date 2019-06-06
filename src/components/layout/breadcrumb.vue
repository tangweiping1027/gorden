<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.breadcrumb {
  font-size: 14px;
  z-index: 999;
}
</style>