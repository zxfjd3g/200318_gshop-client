<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 
      扩展双击监听:
        @dblclick="add2"
            绑定是自定义事件监听, 而el-button内部并没处理(没有绑定对应的原生监听, 没有分发自定义事件)
            双击时, 不会有响应
        @dblclick.native="add2"
            绑定的是原生的DOM事件监听, 最终是给组件的根标签<a>绑定的原生监听
            当双击a内部的<button>能响应, 因为事件有冒泡

     -->
    <HintButton title="双击添加用户" type="primary" icon="el-icon-plus" @dblclick.native="add2"/>
    <HintButton title="添加用户" type="primary" icon="el-icon-plus" @click="add" @xxx="test"/>
    <HintButton title="修改用户" type="info" round icon="el-icon-edit" size="small" @click="update"/>
    <HintButton title="删除用户" type="danger" circle icon="el-icon-delete" size="mini" @click="remove"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      add2 () {
        alert('双击添加')
      },
      add () {
        alert('添加')
      },

      test () {},

      update () {
        alert('更新')
      },

      remove () {
        alert('删除')
      }
    },

    components: {
      HintButton
    }
  }
</script>
