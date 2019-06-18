<template>
  <ElFormItem class="t-form-item" v-bind="$attrs" v-on="$listeners">
    <div :style="{width:width}" class="form-item-wrap">
      <span class="text-class">
        <slot></slot>
      </span>
      <!-- input -->
      <ElInput v-if="type == 'input'" v-model="vals" style="width: 100%" v-bind="$attrs" v-on="$listeners" clearable></ElInput>
      <!-- textarea -->
      <ElInput
        v-else-if="type == 'textarea'"
        type="textarea"
        :autosize="{ minRows: Number(minRows), maxRows: Number(maxRows)}"
        v-model="vals"
        style="width: 100%"
        v-bind="$attrs"
        v-on="$listeners"
        clearable
      ></ElInput>
      <!-- check -->
      <el-checkbox
        v-else-if="type == 'check'"
        :true-label="1"
        :false-label="0"
        v-model="vals"
        style="width: 100%"
        v-bind="$attrs"
        v-on="$listeners"
      ></el-checkbox>

      <!-- time -->
      <el-date-picker
        v-else-if="type == 'time'"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        v-model="vals"
        style="width: 100%"
        v-bind="$attrs"
        v-on="$listeners"
        clearable
      ></el-date-picker>
      <!-- multiple -->
      <template v-else-if="type == 'multiple'">
        <ElSelect multiple collapse-tags v-model="vals" style="width: 100%" v-bind="$attrs" v-on="$listeners" clearable>
          <ElOption v-for="(item, index) in list" :key="index" :label="item.label" :value="item.value"></ElOption>
        </ElSelect>
      </template>
      <!-- select -->
      <template v-else-if="type == 'select'">
        <ElSelect v-model="vals" v-bind="$attrs" style="width: 100%" v-on="$listeners" clearable>
          <ElOption v-for="(item, index) in list" :key="index" :label="item.label" :value="item.value"></ElOption>
        </ElSelect>
      </template>
      <!-- checkbox -->
      <template v-else-if="type == 'checkbox'">
        <el-checkbox-group v-model="vals" style="width: 100%" v-bind="$attrs" v-on="$listeners">
          <el-checkbox v-for="(item, index) in list" :key="index" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <!-- radio -->
      <template v-else-if="type == 'radio'">
        <el-radio-group style="width: 100%;margin-top:8px" v-model="vals" v-bind="$attrs" v-on="$listeners">
          <el-radio v-for="(item, index) in list" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </template>
      <span class="text-class">
        <slot name="back"></slot>
      </span>
    </div>
  </ElFormItem>
</template>

<script>
export default {
  name: 't-form-item',
  props: {
    type: {
      type: String,
      default: 'input'
    },
    value: {},
    width: {
      type: String,
      default: '100%'
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    minRows: {
      type: [Number, String],
      default: 2
    },
    maxRows: {
      type: [Number, String],
      default: 4
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {
    vals: {
      get() {
        if (
          (this.type == 'time' ||
            this.type == 'multiple' ||
            this.type == 'checkbox') &&
          this.value == undefined
        ) {
          return []
        }
        return this.value
      },
      set(val) {
        console.log(val)
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang='scss'>
.t-form-item {
  .form-item-wrap {
    display: flex;
    .text-class {
      display: inline-block;
      padding: 0 0px;
      white-space: nowrap;
    }
  }
}
</style>