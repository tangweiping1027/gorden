<template lang="html">
    <div>
        <slot>
            <div class="searchWarp">
                <el-form :inline="inline" :model="searchForm" class="searchForm" ref="form">
                    <template v-for="(item,index) in searchList">
                        <el-form-item :label="item.label || null" :key='index'>
                            <!-- 输入框 -->
                            <el-input
                                v-if="item.type === 'input'"
                                v-model.trim="searchForm[item.value]"
                                :placeholder="item.placeholder || null"
                                :clearable="item.clearable ||true"
                                :style="item.style || ''"
                                :size="item.size || 'small'"
                                @clear="$emit('search', searchForm)"
                                :prefix-icon="item.prefixIcon"
                                :suffix-icon="item.suffixIcon">
                            </el-input>
                            <!-- 单选款 -->
                            <el-select
                                v-if="item.type === 'select' && item.children"
                                v-model="searchForm[item.value]"
                                :placeholder="item.placeholder || null"
                                :clearable="item.clearable ||true"
                                :style="item.style || ''"
                                @clear="$emit('search', searchForm)"
                                :size="item.size || 'small'">
                                    <el-option
                                        :disabled="j.disabled || false"
                                        :label="j.label ? j.label : j[item.props.label]"
                                        :value="j.value != null ? j.value : j[item.props.value]"
                                        :key="jindex"
                                        v-for="(j,jindex) in item.children">
                                    </el-option>
                            </el-select>
                            <!-- 时间 -->
                            <el-date-picker
                                v-if="item.type === 'time'"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :size="item.size || 'small'"
                                v-model="searchForm[item.value]"
                                type="datetimerange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                @clear="$emit('search', searchForm)"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                            <!-- 多选款 -->
                            <el-select
                                v-if="item.type === 'multiple'"
                                multiple
                                collapse-tags
                                @clear="$emit('search', searchForm)"
                                v-model="searchForm[item.value]"
                                :placeholder="item.placeholder || null"
                                :clearable="item.clearable ||false"
                                :style="item.style || ''"
                                :size="item.size || 'small'">
                                    <el-option
                                        :disabled="j.disabled || false"
                                        :label="j.label"
                                        :value="j.value"
                                        :key="jindex"
                                        v-for="(j,jindex) in item.children">
                                    </el-option>
                            </el-select>

                            <!-- 文本域 -->
                            <el-input
                                v-if="item.type === 'textarea'"
                                type="textarea"
                                @clear="$emit('search', searchForm)"
                                :autosize="item.autosize"
                                :placeholder="item.placeholder || null"
                                v-model="searchForm[item.value]">
                            </el-input>
                            <!-- 级联选择器  -->                            
                            <el-cascader                                
                              v-if="item.type === 'cascader'"
                              :options="item.options" 
                              :props="item.props" 
                              :change-on-select='item.changeOnSelect || false'
                              :placeholder="item.placeholder ||''"
                              :size="item.size || 'small'"
                              :clearable='item.clearable || true'
                              :show-all-levels="item.showalllevels || false"
                              :filterable='item.filterable || false'
                              v-model="searchForm[item.value]">
                            </el-cascader>                        

                        </el-form-item>
                    </template>
                    <!--  -->
                    <el-form-item>
                        <template v-if="searchBtnList.length">
  <el-button
    v-for="(citem,cindex) in searchBtnList"
    :key="cindex"
    type="primary"
    @click="onSubmit(citem)"
    size="small"
  >{{citem}}</el-button>
</template>
                        <template v-else>
  <el-button type="primary" @click="onSubmit" icon="el-icon-search" size="small" :loading="loading">搜 索</el-button>
</template>
                    </el-form-item>
                </el-form>
                <div class="right">
                    <slot name="right"></slot>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    searchList: {
      type: Array,
      default: () => [
        // {
        //     label:'SKU',               //输入款名称    ==>可不传
        //     value:'skuname',           //需要绑定的值  ==>必传
        //     type:'input',              //输入款类型   input、select，multiple，time，textarea  ==>必传
        //     prefixIcon:"el-icon-search",  //type为input 出现的右边icon
        //     suffixIcon:'el-icon-date',    //type为input 出现的左边icon
        //     placeholder:'',            //输入款提示文字 默认为null
        //     size:'small',              //输入款大小，默认small
        //     clearable:true,            //默认可清除
        //     style:{                    //输入款样式
        //         width:"120px",
        //     },
        //     autosize:{                  //type为textarea 控制高度
        //         minRows: 2,
        //         maxRows: 4
        //     },
        //     children:[                  //当type类型为:select(单选) 或者 multiple(多选) 时候传,
        //         {
        //             label:'是',  //下拉款显示的内容
        //             value:'1',         //下拉款绑定的内容
        //         },
        //     ]
        // }
      ]
    },
    searchBtnList: {
      //不适应搜索时可传其他值代替 如['中国'，'美国']
      type: Array,
      default: () => []
    },
    inline: {
      //控制表单方向  默认横向
      type: Boolean,
      default: true
    },
    updatedModel: Function //当绑定的值变化时候触发
  },

  watch: {
    searchForm: {
      handler(val) {
        this.updatedModel && this.updatedModel(val)
      },
      deep: true
    }
  },
  data() {
    return {
      searchForm: {},
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
      },
      treeData: ''
    }
  },
  methods: {
    reset() {
      this.searchForm = {}
      this.$emit('search', {})
    },
    search() {
      return this.searchForm
    },
    getCheckedNodes(data) {
      this.treeData = data
    },
    onSubmit(citem) {
      // console.log(this.searchForm,citem)
      this.treeData && (this.searchForm.emailClassificationIds = this.treeData)
      if (citem) {
        this.$emit('search', this.searchForm, citem)
      } else {
        this.$emit('search', this.searchForm)
      }
    }
  }
}
</script>

<style lang="scss">
.searchWarp {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .right {
    line-height: 41px;
  }
}
.searchForm {
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
