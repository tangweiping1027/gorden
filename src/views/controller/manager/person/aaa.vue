<template>
  <div class="add">
    <ElForm :model="form" ref="form" size="small" :rules="rules" label-width="90px">
      <t-form-item :value.sync="form.aaa" :list="list" type="radio" prop="aaa" label="新表单"></t-form-item>dfas
      <t-form-item :value.sync="form.bbb" :list="list" type="checkbox" prop="bbb" label="新表单2"></t-form-item>
      <t-form-item :value.sync="form.ccc" :list="list" type="time" prop="bbb" label="新表单2">dfas</t-form-item>
      <t-form-item :value.sync="form.ggg" :list="list" type="multiple" prop="bbb" label="新表单2">是么</t-form-item>
      <t-form-item
        :value.sync="form.ddd"
        :list="list"
        type="textarea"
        prop="bbb"
        minRows="4"
        maxRows="8"
        label="新表单2"
      >是么</t-form-item>
      <ElRow>
        <ElCol :span="12">
          <t-form-item :value.sync="form.ddd" label-width="0" :list="list" type="input" prop="bbb">预计</t-form-item>
        </ElCol>
        <ElCol :span="12">
          <t-form-item :value.sync="form.ddd" label-width="0" :list="list" type="input" prop="bbb">到达</t-form-item>
        </ElCol>
      </ElRow>
      <t-form-item :value.sync="form.eee" type="editor" prop="eee" label="新表单2"></t-form-item>
      <t-form-item :value.sync="form.jjj" type="upload" prop="eee" label="新表单2"></t-form-item>
    </ElForm>
  </div>
</template>

<script>
export default {
  data() {
    let vm = this
    return {
      form: {},
      rules: {},
      list: [
        {
          label: '一',
          value: 1
        },
        {
          label: '二',
          value: 2
        }
      ],
      aaa: ''
    }
  },
  watch: {
    form(val) {
      console.log(val)
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  },
  created() {}
}
</script>

<style lang='scss'>
.add {
  background: #fff;
  .normal-input {
    width: 300px;
  }
}
</style>