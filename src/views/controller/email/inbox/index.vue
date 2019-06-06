<template>
  <div class="inbox">
    <t-table :columns="columns" :data="data" @selectChange="change"></t-table>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          label: '点击',
          value: 'aaaaa',
          href: 'http://www.baidu.com'
        }
      ],
      data: []
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>

<style lang='scss'>
.inbox {
  background: #fff;
}
</style>