<template>
  <div class="bbb">123421</div>
</template>

<script>
export default {
  data() {
    return {
      name: '默认标题文字', //默认标题文字
      json: [
        //默认div块的信息 为空的时候只能新增不能修改
        {
          style: {
            width: '150px',
            height: '150px',
            fontSize: '14px',
            color: '#fff',
            left: '50px',
            backgroundColor: '#999'
          },
          text: '这是第一个div'
        }
      ]
    }
  },
  methods: {
    saveJson(obj) {
      console.log(obj)
    }
  }
}
</script>

<style lang='scss'>
.bbb {
  background: #fff;
}
</style>