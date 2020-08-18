<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="dau"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    borrowMoney1 (count) {
      // 让小明的钱减少count
      const son = this.$refs.son  // 得到子组件对象
      // son.money -= count // 直接更新子组件的属性数据
      son.borrowMoney(count) // 调用子组件的方法更新子组件的数据

      // 自己的钱增加count
      this.money += count
    },
    borrowMoney2 (count) {
      // 让小明的钱减少count
      const dau = this.$refs.dau  // 得到子组件对象
      // dau.money -= count // 直接更新子组件的属性数据
      dau.borrowMoney(count) // 调用子组件的方法更新子组件的数据

      // 自己的钱增加count
      this.money += count
    },
    borrowMoney3 (count) {
      // 得到所有孩子, 遍历每个, 更新其数据, 同时更新自己的数据
      this.$children.forEach(child => {
        child.borrowMoney(count)
        this.money += count
      })
    },
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
