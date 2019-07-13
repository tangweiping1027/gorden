<template>
  <div class="inbox">
    <t-table :columns="columns" :data="data" @selectChange="change"></t-table>
    <ElButton type="primary" @click="click">点击</ElButton>
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
        },
        {
          label: '操作',
          btns: [
            {
              name: '编辑',
              icon: 'el-icon-edit-outline',
              fn: () => {
                console.log('编辑')
                return Promise.resolve()
              }
            }
          ]
        }
      ],
      data: [
        {
          aaaaa: 32432
        }
      ]
    }
  },
  mounted() {},
  methods: {
    change(val) {
      console.log(val)
    },
    click() {
      this.$refs.dialog.$dialog({
        title: '添加',
        width: '600px',
        visible: true,
        component: () => import('./numRule')
      })
    }
  }
}
</script>

<style lang='scss'>
.inbox {
  background: #fff;
}
</style>