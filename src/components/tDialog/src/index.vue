<template>
  <div class="dialog-com">
    <el-dialog
      :title="options.title"
      :visible.sync="options.visible"
      :width="options.width"
      @open="open"
      :append-to-body="true"
      :fullscreen="options.fullscreen"
      center
    >
      <el-scrollbar
        wrap-class="default-scrollbar__wrap"
        :style="{height:options.height}"
        view-class="p20-scrollbar__view"
        ref="scroll"
      >
        <div>
          <component :is="options.component" :reserveSelection="options.reserveSelection" :key="indexKey" ref="com"></component>
          <span slot="footer" class="dialog-footer" v-if="options.display">
            <el-button size="small" @click="cancel">{{options.cancelText}}</el-button>
            <el-button size="small" type="primary" @click="submitForm">{{options.submitText}}</el-button>
          </span>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 't-dialog',
  props: {},
  data() {
    return {
      options: {
        title: '',
        visible: false,
        width: '',
        height: '',
        component: '',
        submitText: '',
        cancelText: '',
        submitText: '',
        display: true,
        submitForm: null,
        cancel: null
      },
      indexKey: null
    }
  },
  watch: {},
  methods: {
    async $dialog({
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
      reserveSelection
    }) {
      let vm = this
      vm.indexKey = Math.random()
      await component().then(data => {
        vm.options.reserveSelection = reserveSelection
        vm.options.visible = visible || false
        vm.options.width = width
        vm.options.height = height || '100%'
        vm.options.component = data.default
        vm.options.title = title
        vm.options.childFn = childFn
        vm.options.fullscreen = fullscreen || false
        vm.options.submitText = submitText || '保存'
        vm.options.cancelText = cancelText || '取消'
        vm.options.display = display == false ? false : true
        vm.options.submitForm = submitForm || null
        vm.options.cancel = cancel || null
      })
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
    submitForm() {
      let vm = this
      if (!vm.$refs.com || !vm.$refs.com['submitForm']) {
        vm.options.visible = false
        return
      }
      vm.$refs.com['submitForm'](async data => {
        if (vm.options.submitForm) {
          await vm.options.submitForm(data)
        }
        vm.options.visible = false
      })
    },
    async cancel() {
      if (this.options.cancel) {
        await this.options.cancel()
      }
      this.options.visible = false
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
