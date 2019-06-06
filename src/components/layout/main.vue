<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='scss'>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>