<template>
  <div class="person">
    <t-page :config="config" ref="page"></t-page>
  </div>
</template>

<script>
export default {
  data() {
    let vm = this
    return {
      config: {
        url: null,
        btnConfig: [
          {
            name: '添加',
            fn: () => {
              vm.$refs.page.$dialog({
                title: '添加',
                width: '500px',
                visible: true,
                cancelText: '预览',
                component: () => import('./aaa'),
                childFn: [
                  {
                    name: 'edit',
                    params: {
                      id: 2
                    }
                  }
                ],
                submitForm(data) {
                  console.log(data)
                }
              })
            }
          },
          {
            name: '选择',
            children: [
              {
                name: '你说呢',
                value: '你说呢'
              },
              {
                name: '我说不知道',
                value: '我说不知道'
              }
            ]
          }
        ],
        searchConfig: [
          {
            label: '管理员名称',
            value: 'maneger',
            type: 'input'
          }
        ],
        tableConfig: [
          {
            label: '备注',
            value: 'remark'
          },
          {
            label: '管理员',
            value: 'manager'
          },
          {
            label: '操作',
            btns: [
              {
                label: '删除',
                fn: () => {}
              }
            ]
          }
        ],
        clickBtn(val) {
          console.log(val)
        }
      }
    }
  },
  mounted() {
    // this.$refs.page.$dialog({
    //   title: '添加',
    //   width: '1000px',
    //   visible: true,
    //   cancelText: '预览',
    //   component: () => import('./aaa'),
    //   submitForm(data) {
    //     console.log(data)
    //   }
    // })
  }
}
</script>

<style lang='scss'>
.person {
  background: #fff;
}
</style>
