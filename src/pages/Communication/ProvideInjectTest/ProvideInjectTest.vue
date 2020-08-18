<template>
  <div>
    <h2>祖组件标题</h2>
    <p @click="content1 += '--'">{{content1}}</p>
    <p @click="content2= {name: '++++'}">{{content2.name}}</p>
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
      content1: 'abc',
      content2: {
        name: 'tom'
      }
    }
  },

  provide () {
    return { // 声明向所有后代提供2个数据
      content11: this.content1,
      content22: this.content2,
      updateContent1: this.updateContent1
    }
  },

  methods: {
    updateContent1 (msg) {
      this.content1 += msg
    }
  },

  components: {
    Child
  }
}
</script>

<style lang="less" scoped>

</style>
