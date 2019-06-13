<template>
  <div class="inbox">
    <t-table :columns="columns" :data="data" @selectChange="change"></t-table>
    <ElButton type="primary">点击</ElButton>
    <t-dialog ref="dialog"></t-dialog>
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
  mounted() {
    this.$refs.dialog.$dialog({
      title: '添加',
      width: '600px',
      visible: true,
      component: () => import('./numRule')
    })
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