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
        url: 'email/emailBasePage',
        moreParams: {
          platformId: 1,
          emailType: 1
        },
        btnConfig: [
          {
            name: '添加',
            fn: () => {
              vm.$refs.page.$dialog({
                title: '添加1',
                width: '500px',
                visible: true,
                footBtns: [
                  {
                    name: '预览',
                    value: 'cancel'
                  }
                ],
                component: () => import('./aaa'),
                childFn: [
                  {
                    name: 'edit',
                    params: {
                      id: 2
                    }
                  }
                ],
                submit(data) {
                  console.log(data)
                  // return Promise.resolve()
                },
                cancel(data) {
                  console.log(data)
                  // return Promise.resolve()
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
            label: '操作',
            btns: [
              {
                name: '删除',
                icon: 'el-icon-delete',
                fn(index, row) {
                  console.log(index, row)
                }
              }
            ]
          },
          {
            label: '回复状态',
            value: 'replyTypeName',
            width: '70'
          },
          {
            label: '客户',
            value: 'customerName',
            mult: [
              {
                label: '邮箱',
                value: 'customerEmailBox'
              },
              {
                label: '订单号',
                value: 'orderNumSystem'
              }
            ]
          },

          {
            label: '订单来源店铺',
            value: 'storeName'
          },
          {
            label: '收取时间',
            value: 'receiveTime'
          },
          {
            label: '回复时间',
            value: 'replyTime'
          },
          {
            label: '客服人员',
            value: 'serviceName'
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
