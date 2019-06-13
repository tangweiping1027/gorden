<template>
  <span>
    <div class="item-wrap" :style="itemStyle">
      {{label}}
      <slot>
        <ElInput v-if="type == 'input'" v-model="vals" size="small" class="item-input select-wrap" clearable></ElInput>
        <span v-else-if="type == '-'" style="display: inline-block">
          -
          <ElInput v-model="vals" style="width: 0;opacity: 0" size="small"></ElInput>
        </span>
        <el-input-number
          v-else-if="type == 'number'"
          v-model="vals"
          @change="$emit('change',$event)"
          size="small"
          :min="0"
          :controls="false"
          :max="maxNum"
          class="item-input number-wrap"
        ></el-input-number>
        <ElSelect
          v-else-if="type == 'select'"
          v-model="vals"
          size="small"
          clearable
          placeholder="请选择"
          class="select-wrap"
        >
          <ElOption label="yyyy年yy月yy日" value="0"></ElOption>
          <ElOption label="yyyy-yy-yy" value="-"></ElOption>
          <ElOption label="yyyy/yy/yy" value="/"></ElOption>
        </ElSelect>
      </slot>
      <slot name="last"></slot>
      <div class="item-close">
        <span @click="$emit('close')" style="cursor: pointer">
          <i class="el-icon-close"></i>
        </span>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String, // input   number   select
      default: ''
    },
    value: {
      default: ''
    },
    digit: {
      default: false
    },
    type: {
      type: [String],
      default: 'input'
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    vals: {
      get() {
        return this.value
      },
      set(val) {
        val = '' + val
        if (val.length > 4 && this.type != 'select') {
          val = val.substr(1, 4)
        }
        this.$emit('update:value', val)
      }
    }
  },
  mounted() {
    if (this.digit) {
      this.maxNum = 4
    }
  },
  methods: {},
  data() {
    return {
      maxNum: 9999999999999999999999999999
    }
  }
}
</script>

<style lang='scss'>
.select-wrap {
  width: 116px;
  input {
    padding-left: 16px !important;
    text-align: left !important;
  }
}
</style>