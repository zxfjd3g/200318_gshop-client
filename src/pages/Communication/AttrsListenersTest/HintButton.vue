<template>
  <a href="javascript:" :title="title">
    <!-- 内部的子组件需要接收一些不确定的属性 -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title'],

  created () {
    console.log(this.$attrs, this.$listeners)
  },
}
</script>