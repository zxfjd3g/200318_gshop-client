<template>
  <div>
    <h2>子组件标题</h2>
    <br>
    <GrandChild />
  </div>
</template>

<script>
import GrandChild from './GrandChild'
export default {
  name: 'Child',
  components: {
    GrandChild
  }
}
</script>

<style lang="less" scoped>

</style>
