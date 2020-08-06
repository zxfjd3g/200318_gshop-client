<template>
  <div>
    <h2>params: {{$route.params.keyword}}</h2>
    <h2>query: {{$route.query.keyword2}}</h2>
    <h2>params==>props: {{keyword3}}</h2>
    <h2>query==>props: {{keyword4}}</h2>
    <h2>attrs: {{$attrs.xxx}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['keyword3', 'keyword4']
}
</script>

<style lang="less" scoped>

</style>
