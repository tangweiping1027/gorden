<template>
  <div class="t-page">
    <UniversalLayout :btnList="btnConfig" @clickBtn="clickBtn">
      <section slot="search">
        <search :searchList="searchConfig" @search="handleSearch"></search>
      </section>
      <section slot="table">
        <t-table
          :data="tableData"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
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
          moreParams: {}
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
          moreParams: {}
        },
        {},
        vm.config
      ),
      tableData: [
        {
          remark: '1'
        }
      ],
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
      if (this.$refs['dialog'] && this.$refs['dialog'].$dialog) {
        this.$refs['dialog'].$dialog(options)
      }
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
        let searchInfo = vm.searchForm(vm.searchInfo) || {}
        params = Object.assign({}, params, searchInfo)
      }
      if (!this.url) {
        this.tableLoading = false
        return
      }
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
    },

    clearSelection() {
      this.$refs.table.toggleSelection()
    },
    choseSelection(row) {
      this.$refs.table.toggleSelection(row)
    }
  }
}
</script>

<style lang='scss'>
</style>