<template>
  <div class="diaolog-vue">
    <ElForm :model="form" ref="form" size="small" :rules="rules" label-width="100px">
      <ElRow style="width: 560px">
        <ElCol :span="5">
          <div class="wrap-left">
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('fixedNumFlag')" size="mini">固定数字</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('fixedLetterFlag')" size="mini">固定字母</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('randomNumFlag')" size="mini">随机数字</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('randomLetterFlag')" size="mini">随机字母</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('dateFlag')" size="mini">日期</ElButton>
            </div>
            <div class="btn-wrap">
              <ElButton type="primary" @click="handleAddRules('serialNumFlag')" size="mini">流水号</ElButton>
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
                v-if="rule.type == 'fixedNumFlag'"
                label="固定数字"
                type="number"
                :value.sync="form.fixedNum"
                @close="rule.type = false"
              ></rule-wrap>
              <!-- 固定字母 -->
              <rule-wrap
                v-if="rule.type == 'fixedLetterFlag'"
                label="固定字母"
                :value.sync="form.fixedLetter"
                @close="rule.type = false"
              ></rule-wrap>
              <!-- 随机数字 -->
              <rule-wrap
                v-if="rule.type == 'randomNumFlag'"
                label="随机数字"
                :digit="true"
                type="number"
                :value.sync="form.randomNum"
                @close="rule.type = false"
              >
                <template slot="last">位</template>
              </rule-wrap>
              <!-- 随机字母 -->
              <rule-wrap
                v-if="rule.type == 'randomLetterFlag'"
                label="随机字母"
                :digit="true"
                :value.sync="form.randomLetter"
                @close="rule.type = false"
                type="number"
              >
                <template slot="last">位</template>
              </rule-wrap>
              <!-- 日期 -->
              <rule-wrap
                v-if="rule.type == 'dateFlag'"
                label="日期"
                type="select"
                :value.sync="form.date"
                @close="rule.type = false"
              ></rule-wrap>
              <!-- 流水号起始数字 -->
              <rule-wrap
                v-if="rule.type == 'serialNumFlag'"
                label="流水号起始数字"
                @close="rule.type = false"
                :itemStyle="{width: '341px',paddingRight: '38px'}"
              >
                <el-input-number
                  v-model="form.serialNumStart"
                  size="small"
                  :controls="false"
                  :min="0"
                  :max="999999999"
                  class="item-input"
                  style="width: 100px"
                ></el-input-number>
                <!-- <ElInput v-model="form.serialNumStart" size="small" class="item-input"></ElInput> -->
                位数
                <el-input-number
                  v-bind:value="form.serialNumEnd"
                  v-on:blur="handleSerialNum($event.target.value,idx)"
                  size="small"
                  :controls="false"
                  :min="0"
                  :max="9"
                  class="item-input"
                  style="width: 86px"
                ></el-input-number>
                <!-- <ElInput v-model="form.serialNumEnd" size="small" class="item-input"></ElInput> -->
              </rule-wrap>

              <rule-wrap
                v-if="rule.type == '-'"
                type="-"
                :itemStyle="{padding: 0,paddingLeft: '8px',paddingTop: '2px',paddingBottom: '2px',width: '12px'}"
                @close="rule.type = false"
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
      form: {
        fixedNum: '',
        fixedLetter: '',
        randomNum: '',
        randomLetter: '',
        date: '',
        serialNumStart: 0,
        serialNumEnd: 0
      },
      rules: {},
      fixedNumFlag: false,
      fixedLetterFlag: false,
      randomNumFlag: false,
      randomLetterFlag: false,
      dateFlag: false,
      serialNumFlag: false,
      serialNum: ''
    }
  },
  computed: {
    preview() {
      let fixedNum = this.form.fixedNum || ''
      let fixedLetter = this.form.fixedLetter || ''
      let randomNum = this.getRandomNum(this.form.randomNum) || ''
      let date = this.form.date || ''
      let randomLetter = this.getRandomLetter(this.form.randomLetter) || ''
      return `${fixedNum}${fixedLetter}${randomNum}${randomLetter}${date}${
        this.serialNum
      }`
    }
  },
  mounted() {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.list)
    })
    this.$dragging.$on('dragend', res => {
      console.log(res)
    })
  },
  methods: {
    // 点击显示右侧rule
    handleAddRules(ruleType) {
      let ruleList = this.ruleList
      if (ruleType == '-') {
        this.ruleList.push({ type: '-' })
      } else if (!ruleList.find(item => item.type == ruleType)) {
        this.ruleList.push({
          type: ruleType
        })
      }
    },
    handleSerialNum(val) {
      let vm = this
      vm.form.serialNumEnd = Number(val)
      let serialNum = vm.prefixNum(vm.form.serialNumStart, vm.form.serialNumEnd)
      vm.serialNum = serialNum == '0' ? '' : serialNum
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
    addSymbol() {
      console.log(234)
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
        width: 60px;
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