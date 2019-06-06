<template lang="html">
    <transition name="el-fade-in">
        <div class="UniversalLayout" v-show="show">

            <!--  -->
            <slot>
                <header :class=" isAmazon ? 'search1' : 'search'">
                    <slot name="search"></slot>
                </header>
                <!--  -->
                <section class="allbtn">
                    <slot name="allbtn">
                        <div class="btnList" v-if="btnList.length">
                            <template v-for="(i,index) in btnList">
                                <!--  -->
                                <el-button
                                    class="margin10"
                                    :size="i.size || 'small'"
                                    :type="i.type || 'primary'"
                                    :key="index"
                                    :icon="i.icon || null"
                                    v-if="!i.hasOwnProperty('children')"
                                    @click="i.fn && i.fn(i.name)">{{i.name}}</el-button>
                                <!-- 按鈕点击否有选项 -->
                                <el-dropdown
                                    :key="index"
                                    class="margin10"
                                    v-if="i.hasOwnProperty('children') && i.children.length"
                                    @command="clickBtn">
                                    <el-button :type="i.type || 'primary'" :size="i.size || 'small'">
                                      {{i.name}}
                                      <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(j,jindex) in i.children" :command="j.name" :key="jindex">{{j.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </div>
                        <!--  -->
                        <div class="btnRight">
                            <slot name="btnRight"></slot>
                        </div>
                    </slot>
                </section>
                <!--  -->
                <section class="table">
                   <slot name="table"></slot>
                </section>
                <!--  -->
            </slot>
            <!--  -->

        </div>

    </transition>
</template>

<script>
export default {
  name: 'UniversalLayout',
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    isAmazon: {
      type: Boolean,
      default: false
    },
    pageNo: Number,
    pageSize: Number,
    total: Number,
    btnList: {
      type: Array,
      default: () => [
        // {
        //     name:"添加",
        //     value:'点击的是添加',
        //     size:'small',
        //     type:'primary'
        // },
        // {
        //     name:"批量修改",
        //     value:'点击的是批量修改',
        //     type:'success',
        //     children:[
        //         {
        //             name:"修改运输方式",
        //             value:'修改运输方式',
        //         },
        //         {
        //             name:"修改延迟发货原因",
        //             value:'修改延迟发货原因',
        //
        //         }
        //     ]
        // }
      ]
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    /* eslint-disable */
    clickBtn(value, name) {
      this.$emit('clickBtn', value, name)
      // if (name) {
      //     this.$emit(name, value)
      // }
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang="scss" >
.pad10 {
  padding: 10px;
}
.margin10 {
  margin-right: 10px;
}
$bgcolor: rgba(242, 242, 242, 1);

.UniversalLayout {
  @extend .pad10;
  position: absolute;
  // box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 16px;
  .search {
    @extend .pad10;
    background: $bgcolor;
    border-radius: 5px;
  }
  .search1 {
    padding: 0px;
    border-radius: 5px;
  }
  .allbtn {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
    // position: absolute;
    // bottom: 10px;
    // left: 0;
    // right: 0;
  }
}
</style>
