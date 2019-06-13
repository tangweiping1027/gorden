<template>
  <div class="diaolog-vue">
    <ElForm :model="form" ref="form" size="small" :rules="rules" label-width="100px">
      <ElRow style="width: 560px">
        <ElCol :span="5">
          <div class="wrap-left">
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('fixedNum')" size="mini">固定数字</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('fixedLetter')" size="mini">固定字母</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('randomNum')" size="mini">随机数字</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('randomLetter')" size="mini">随机字母</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('date')" size="mini">日期</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('serialNum')" size="mini">流水号</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="default" @click="handleAddRules('-')" size="mini">-</ElButton>
            </div>
          </div>
        </ElCol>
        <ElCol :span="19">
          <div class="wrap-right">
            <div
              v-for="(rule, idx) in ruleList"
              v-dragging="{ item: rule, list: ruleList, group: 'rule' }"
              :key="idx"
              :style="{display: 'inline-block'}"
            >
              <!-- 固定数字 -->
              <rule-wrap
                v-if="rule.type == 'fixedNum'"
                label="固定数字"
                type="number"
                :value.sync="rule.value"
                @close="handleClose(idx)"
              ></rule-wrap>
              <!-- 固定字母 -->
              <rule-wrap
                v-if="rule.type == 'fixedLetter'"
                label="固定字母"
                :value.sync="rule.value"
                @close="handleClose(idx)"
              ></rule-wrap>
              <!-- 随机数字 -->
              <rule-wrap
                v-if="rule.type == 'randomNum'"
                label="随机数字"
                :digit="true"
                type="number"
                :value.sync="randomNum"
                @close="handleClose(idx)"
                @change="handleNumChange($event,idx, 'randomNum')"
              >
                <template slot="last">位</template>
              </rule-wrap>
              <!-- 随机字母 -->
              <rule-wrap
                v-if="rule.type == 'randomLetter'"
                label="随机字母"
                :digit="true"
                :value.sync="randomLetter"
                @close="handleClose(idx)"
                type="number"
                @change="handleNumChange($event,idx, 'randomLetter')"
              >
                <template slot="last">位</template>
              </rule-wrap>
              <!-- 日期 -->
              <rule-wrap
                v-if="rule.type == 'date'"
                label="日期"
                type="select"
                :value.sync="rule.value"
                @close="handleClose(idx)"
              ></rule-wrap>
              <!-- 流水号起始数字 -->
              <rule-wrap
                v-if="rule.type == 'serialNum'"
                label="流水号起始数字"
                @close="handleClose(idx)"
                :itemStyle="{width: '341px',paddingRight: '38px'}"
              >
                <el-input-number
                  v-model="serialNumStart"
                  v-on:blur="handleSerialNum(idx)"
                  size="small"
                  :controls="false"
                  :min="0"
                  :max="999999999"
                  class="item-input"
                  style="width: 100px"
                ></el-input-number>
                <!-- <ElInput v-model="rule.serialNumStart" size="small" class="item-input"></ElInput> -->
                位数
                <el-input-number
                  v-model="serialNumEnd"
                  @blur="handleSerialNum(idx)"
                  size="small"
                  :controls="false"
                  :min="0"
                  :max="9"
                  class="item-input"
                  style="width: 86px"
                ></el-input-number>
                <!-- <ElInput v-model="rule.serialNumEnd" size="small" class="item-input"></ElInput> -->
              </rule-wrap>

              <rule-wrap
                @close="handleClose(idx)"
                v-if="rule.type == '-'"
                type="-"
                :itemStyle="{padding: 0,paddingLeft: '8px',paddingTop: '2px',paddingBottom: '2px',width: '12px'}"
              ></rule-wrap>
            </div>
          </div>
        </ElCol>
      </ElRow>
      <ElRow style="width: 560px">
        <ElCol :span="5">
          <div class="wrap-left-min">
            <div class="btn-wrap">
              <ElButton type="primary" size="mini">预览</ElButton>
            </div>
          </div>
        </ElCol>
        <ElCol :span="19">
          <div class="wrap-right-min">{{preview}}</div>
        </ElCol>
      </ElRow>
    </ElForm>
  </div>
</template>

<script>
import ruleWrap from './ruleWrap'
export default {
  components: {
    ruleWrap
  },
  data() {
    return {
      ruleList: [],
      form: {},
      serialNumStart: 0,
      serialNumEnd: 0,
      randomNum: 0,
      randomLetter: 0,
      rules: {},
      preview: ''
    }
  },
  computed: {},
  watch: {
    ruleList: {
      deep: true,
      immediate: true,
      handler(val) {
        let vm = this
        this.preview = val
          .map(item => {
            if (item.type == 'date') {
              return vm.getNowFormatDate(item.value)
            } else {
              return item.value
            }
          })
          .join('')
      }
    }
  },
  mounted() {},
  methods: {
    // 点击显示右侧rule
    handleAddRules(ruleType) {
      let ruleList = this.ruleList
      if (ruleType == '-') {
        this.ruleList.push({ type: '-', value: '-' })
      } else if (!ruleList.find(item => item.type == ruleType)) {
        let obj = {
          type: ruleType
        }
        obj.value = null
        if (ruleType == 'date') {
          obj.value = '/'
        }
        this.ruleList.push(obj)
      }
    },
    handleNumChange(val, index, type) {
      let vm = this
      if (type == 'randomNum') {
        vm.$set(vm.ruleList[index], 'value', vm.getRandomNum(Number(val)))
      } else if (type == 'randomLetter') {
        vm.$set(vm.ruleList[index], 'value', vm.getRandomLetter(Number(val)))
      }
    },
    handleSerialNum(index) {
      let vm = this
      let startLen = vm.serialNumStart.toString().length
      let serialNum = ''
      if (startLen > vm.serialNumEnd) {
        serialNum = vm.serialNumStart || ''
      } else {
        serialNum = vm.prefixNum(vm.serialNumStart, vm.serialNumEnd) || ''
      }
      this.$set(vm.ruleList[index], 'value', serialNum)
    },
    edit(params) {
      console.log(params)
    },
    prefixNum(num, n) {
      return (Array(n).join(0) + num).slice(-n)
    },
    getRandomNum(num) {
      // return Math.floor(Math.random() * Math.pow(10, Number(num)))
      let str = ''
      function repeat() {
        return Math.floor(Math.random() * 10)
      }
      for (let i = 1; i <= num; i++) {
        str += repeat()
      }
      return str
    },
    getRandomLetter(num) {
      var result = []
      for (var i = 0; i < Number(num); i++) {
        var ranNum = Math.ceil(Math.random() * 25) //生成一个0到25的数字
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
        result.push(String.fromCharCode(65 + ranNum))
      }
      return result.join('')
    },
    submitForm(cb) {
      let vm = this
      let _data = vm.$clone(vm.form)
      vm.$refs['form'].validate(valid => {
        if (valid) {
          cb && cb(_data)
        } else {
          console.log('error')
        }
      })
    },
    getNowFormatDate(type) {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return `${year}${type != '0' ? type : '年'}${month}${
        type != '0' ? type : '月'
      }${strDate}`
    },
    handleClose(index) {
      this.ruleList.splice(index, 1)
    }
  }
}
</script>

<style lang='scss'>
.diaolog-vue {
  background: #fff;
  .wrap-left {
    border: 1px solid grey;
    margin: 0 0 0 10px;
    height: 246px;
    padding: 0 10px;
  }
  .wrap-left-min {
    border: 1px solid grey;
    margin: 10px 0 0 10px;
    padding: 0 10px;
    height: 40px;
  }
  .wrap-right-min {
    border: 1px solid grey;
    margin: 10px 10px 0 10px;
    padding-left: 10px;
    box-sizing: border-box;
    height: 42px;
    line-height: 42px;
  }
  .wrap-right {
    border: 1px solid grey;
    margin: 0 10px;
    height: 248px;
    padding: 0;
    box-sizing: border-box;
    .el-input__inner {
      padding: 0 2px 0 2px;
      text-align: center;
    }

    .item-wrap {
      width: 156px;
      border: 1px solid #bbb;
      display: inline-block;
      padding: 2px 14px 2px 10px;
      margin-left: 3px;
      position: relative;
      border-radius: 4px;
      margin-top: 6px;
      .item-close {
        position: absolute;
        right: 2px;
        top: 2px;
        color: red;
      }
      .item-input {
        width: 72px;
        margin: 0 4px;
      }
    }
  }
  .btn-wrap {
    margin-top: 6px;
  }
  .normal-input {
    width: 300px;
  }
  .el-button--mini,
  .el-button--mini.is-round {
    width: 80px;
  }
}
</style>