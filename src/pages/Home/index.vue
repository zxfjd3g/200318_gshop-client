<template>
  <div>
    <!-- 大写转小写, 中间用-连接 -->
    <type-nav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors" :floor="floor" :key="floor.id"/>
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  import TodayRecommend from './TodayRecommend/TodayRecommend'
  // import {reqBanners, reqFloors} from '@/api'

  export default {
    name: 'Home',


    computed: {
      ...mapState({
        floors: state => state.home.floors,  // [] ==> [{carouselList: []}, {}]
      })
    },

    async mounted () {
      // const result = await reqFloors()
      // console.log('result', result)

      this.$store.dispatch('getBanners')
      this.$store.dispatch('getFloors')
    },

    components: {
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank,
      TodayRecommend,
    }
  }
</script>

<style lang="less" scoped>

</style>