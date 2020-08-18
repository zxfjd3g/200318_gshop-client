<template>
  <div>
    <h4>孙组件</h4>
    <p>{{content11}}</p>
    <p>{{content22.name}}</p>
    <button @click="updateContent1('abc')">更新祖组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'GrandChild',
  inject: ['content11', 'content22', 'updateContent1'], // 声明注入的属性就会成为组件对象的属性
}
</script>

