<template>
  <div class="dialog-com">
    <el-dialog
      :title="options.title || '添加'"
      :visible.sync="options.visible"
      :width="options.width"
      @open="open"
      :append-to-body="true"
      :fullscreen="options.fullscreen || false"
      center
    >
      <el-scrollbar
        wrap-class="default-scrollbar__wrap"
        :style="{height:options.height || '100%'}"
        view-class="p20-scrollbar__view"
        ref="scroll"
      >
        <div>
          <component
            :is="options.component"
            :reserveSelection="options.reserveSelection || 'id'"
            v-bind="$attrs"
            v-on="$listeners"
            :key="indexKey"
            ref="com"
          ></component>
          <template v-if="options.display == false ? false : true">
            <span slot="footer" class="dialog-footer">
              <template v-for="(item, index) in options.footBtns">
                <el-button
                  :loading="loading"
                  size="small"
                  type="primary"
                  :key="index"
                  @click="handleSubmit(`${item.value}`)"
                >{{item.name || '保存'}}</el-button>
              </template>
            </span>
          </template>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    listFlag: {
      // 如果form中是表结构
      type: Boolean,
      default: false
    },
    titleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  name: 't-dialog',
  data() {
    return {
      options: {
        title: '',
        visible: false,
        width: '',
        height: '',
        component: '',
        cancelText: '',
        submitText: '',
        display: true,
        submit: null,
        cancel: null
      },
      indexKey: null,
      loading: false,
      titleDefaultList: ['编辑', '添加', '删除'],
      defaultBtns: [
        {
          name: '取消',
          value: 'cancel'
        },
        {
          name: '保存',
          value: 'submit'
        }
      ]
    }
  },
  watch: {},
  created() {
    if ($isArray(this.titleList) && this.titleList.length) {
      this.titleDefaultList = [...this.titleDefaultList, ...this.titleList]
    }
  },
  methods: {
    async $dialog(params) {
      let vm = this

      vm.indexKey = Math.random()
      let {
        title,
        visible,
        width,
        component,
        submitText,
        cancelText,
        childFn,
        display,
        height,
        submitForm,
        cancel,
        fullscreen,
        reserveSelection,
        footBtns
      } = params
      try {
        // await component().then(data => {
        //   vm.options.reserveSelection = reserveSelection
        //   vm.options.visible = visible || false
        //   vm.options.width = width
        //   vm.options.height = height || '100%'
        //   vm.options.component = data.default
        //   vm.options.title = title
        //   vm.options.childFn = childFn
        //   vm.options.fullscreen = fullscreen || false
        //   vm.options.submitText = submitText || '保存'
        //   vm.options.cancelText = cancelText || '取消'
        //   vm.options.display = display == false ? false : true
        //   vm.options.submitForm = submitForm || null
        //   vm.options.cancel = cancel || null
        // })
        await component().then(data => {
          vm.options = Object.assign({}, vm.options, params)
          vm.options.component = data.default
          vm.options.footBtns = footBtns
            ? vm.$wipeRepet([...vm.defaultBtns, ...footBtns], 'value')
            : vm.defaultBtns
        })
      } catch (error) {
        console.log(error)
      }
    },
    open() {
      let vm = this
      let childFn = this.options.childFn

      childFn ? childFn : []
      vm.$nextTick(() => {
        vm.$refs.com['resetForm'] && vm.$refs.com['resetForm']()
        if (childFn && childFn.length) {
          childFn.map(async item => {
            try {
              if (item.name == 'getList') {
                vm.$refs.com[item.name] &&
                  (await vm.$refs.com[item.name](null, item.params))
              } else {
                vm.$refs.com[item.name] &&
                  (await vm.$refs.com[item.name](item.params))
              }
            } catch (error) {
              console.log(error)
            }
          })
        }
      })
    },
    getList(val) {
      this.$refs['com'].getList(val)
    },
    handleSubmit(submitName) {
      let vm = this
      if (vm.$refs.com.form && vm.$refs.com.$refs.form) {
        let data = vm.$clone(vm.$refs.com.form) // form表单的值
        let form = vm.$refs.com.$refs.form // form 表单
        form.validate(async valid => {
          if (valid) {
            try {
              vm.$refs.com.formatForm &&
                $isFunction(vm.$refs.com.formatForm) &&
                vm.$refs.com.formatForm(data) &&
                (data = vm.$refs.com.formatForm(data))

              vm.loading = true
              // options.submitForm 为Promise对象
              if (!vm.options[submitName]) {
                // 如果submitForm 不存在，则直接关闭不做任何处理
                console.warn(`options.${submitName}不存在`)
                vm.loading = false
                vm.options.visible = false
                return
              }
              vm.options[submitName](data)
                .then(() => {
                  vm.options.visible = false
                  // 如果有loading 在此处理
                  vm.loading = false

                  // loading
                  // 处理t-page表单
                  if (vm.listFlag) {
                    vm.titleDefaultList.forEach(element => {
                      if (vm.options.title.indexOf(element) >= 0) {
                        try {
                          vm.$parent.getList &&
                            $isFunction(vm.$parent.getList) &&
                            vm.$parent.getList()
                          if (element == '删除') {
                            vm.$parent.clearSelection &&
                              $isFunction(vm.$parent.clearSelection) &&
                              vm.$parent.clearSelection()
                          }
                        } catch (error) {
                          console.log(error)
                        }
                      }
                    })
                  }
                })
                .catch(() => {
                  vm.loading = false
                })
            } catch (error) {
              if (JSON.stringify(error).indexOf('then of undefined') >= -1) {
                console.warn(`${submitName}不是一个Promise对象`)
                // vm.options[submitName](data)
                vm.loading = false
                vm.options.visible = false
              } else {
                console.log(error)
              }
            }
          } else {
            console.log('error')
          }
        })
      } else {
        console.log('表单form不存在')
      }
    }
  }
}
</script>

<style lang="scss">
.dialog-com {
  background: #fff;
  .p20-scrollbar__view {
    padding: 17px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }
  .default-scrollbar__wrap {
    overflow-x: auto;
    max-height: 560px;
    margin-right: 0 !important;
  }
}
.dialog-footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
