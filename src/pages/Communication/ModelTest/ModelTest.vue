<template>
  <div>
    <h2>深入v-model</h2>

    <!-- html标签上的v-model本质: 动态value属性 + 原生input监听(将输入的最新值保存到属性上) -->
    <input type="text" v-model="msg1">
    <span>{{msg1}}</span><br>
    <input type="text" :value="msg2" @input="msg2 = $event.target.value">
    <span>{{msg2}}</span>
    <br>
    <br>


    <!-- 组件标签上的v-model本质: 动态value属性 + 自定义input监听(将子组件分发数据保存父组件的属性上) -->
    <custom-input v-model="msg3"/>
    <span>{{msg3}}</span>
    <br>
    <br>
    <custom-input :value="msg4" @input="msg4 = $event"/>
    <span>{{msg4}}</span>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data () {
      return {
        msg1: 'abc',
        msg2: 'atguigu',
        msg3: 'haha',
        msg4: 'hehe'
      }
    },
    components: {
      CustomInput
    }
  }
</script>
