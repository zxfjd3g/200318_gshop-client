<template>
  <div>
    <h2>祖组件标题</h2>
    <hr>
    <Child/>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'ProvideInjectTest',

  data () {
    return {
    }
  },

  components: {
    Child
  }
}
</script>

<style lang="less" scoped>

</style>
