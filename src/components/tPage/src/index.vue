<template>
  <div class="t-page">
    <UniversalLayout :btnList="btnList" @delete="handleDelete" @clickBtn="clickBtn" :pagination="false">
      <section slot="search">
        <search :searchList="searchConfig" @search="handleSearch"></search>
      </section>
      <section slot="table">
        <t-table
          :data="tableData"
          :border="true"
          @delete="handleDelete"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @selectChange="selectChange"
          v-loading="tableLoading"
          :columns="tableConfig"
          ref="table"
          v-bind="$attrs"
          v-on="$listeners"
          :pageNo="pageNo"
          :pageSize="pageSize"
          :total="total"
        ></t-table>
      </section>
    </UniversalLayout>
    <t-dialog ref="dialog" v-bind="$attrs" v-on="$listeners" :listFlag="true"></t-dialog>
  </div>
</template>

<script>
import { filter } from 'minimatch'
export default {
  name: 'tPage',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          url: '/',
          btnConfig: [],
          searchConfig: [],
          tableConfig: [],
          searchForm(val) {
            return val
          },
          clickBtn() {},
          moreParams: {},
          selectData: []
        }
      }
    }
  },
  data() {
    let vm = this
    return {
      ...Object.assign(
        {
          url: '/',
          btnConfig: [],
          searchConfig: [],
          tableConfig: [],
          searchForm(val) {
            return val
          },
          clickBtn() {},
          moreParams: {},
          selectData: []
        },
        {},
        vm.config
      ),
      tableData: [],
      searchInfo: {},
      tableLoading: true,
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    btnList: {
      get() {
        let vm = this
        // vm.btnConfig.forEach(item => {
        //   if (item.name.indexOf('删除') >= 0) {
        //     console.log(123213)
        //   }
        // })
        return vm.btnConfig
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val
      this.getList('search')
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList('search')
    },
    handleSearch(val) {
      val = JSON.parse(JSON.stringify(val))
      this.pageNo = 1
      this.searchInfo = val
      this.getList('search')
      this.clearSelection()
    },
    $dialog(options) {
      this.$refs.dialog &&
        this.$refs.dialog.$dialog &&
        this.$refs.dialog.$dialog(options)
    },
    getList(type) {
      let vm = this
      let params = {
        pageSize: vm.pageSize,
        pageNumber: vm.pageNo,
        sortOrder: 'asc',
        ...vm.moreParams
      }
      if (type) {
        let searchInfo = JSON.parse(
          JSON.stringify(vm.searchForm(vm.searchInfo) || {})
        )
        // 默认第一个时间为time
        if (
          searchInfo.time &&
          vm.utils.isArray(searchInfo.time) &&
          !vm.utils.isEmpty(searchInfo.time)
        ) {
          searchInfo.startTime = searchInfo.time[0]
          searchInfo.endTime = searchInfo.time[1]
          delete searchInfo.time
        }
        params = Object.assign({}, params, searchInfo)
        // 处理为空的情况
        params = vm.utils.filterObj(params)
      }
      if (!this.url) {
        this.tableLoading = false
        return
      }
      try {
        vm.$api[vm.url](params)
          .then(({ pageNo, pageSize, total, rows = [] }) => {
            vm.pageNo = pageNo
            vm.pageSize = pageSize
            vm.total = total
            vm.tableData = rows
            vm.tableLoading = false
          })
          .catch(() => {
            vm.tableLoading = false
          })
      } catch (error) {
        vm.tableLoading = false
        console.warn(error)
      }
    },
    handleDelete(...arg) {
      this.$delete(...arg)
        .then(() => {
          this.clearSelection()
          this.getList('search')
        })
        .catch(() => {})
    },
    clearSelection() {
      this.$refs.table.toggleSelection()
    },
    choseSelection(row) {
      this.$refs.table.toggleSelection(row)
    },
    selectChange(val) {
      this.selectData = val
      this.config.selectData = val
    }
  }
}
</script>

<style lang='scss'>
</style>