<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 分页指示器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Carousel',
  props: {
    carouselList: Array,
    autoplay: Boolean
  },

  mounted (){
    // if (this.carouselList.length>0) {
    //   new Swiper(this.$refs.swiper, {
    //     // direction: 'vertical', // 垂直切换选项   默认就是horizontal
    //     loop: true, // 循环模式选项
    //     autoplay: this.autoplay,
    //     // 如果需要分页器
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //   }) 
    // }
  },

  watch: {

      // 更新数据 => 立即同步调用监视的回调 ==> 异步更新界面
      // carouselList () { // banners更新了([] ==> [..])
      //   console.log('-------', this.carouselList)
      //   // 需要在界面更新后创建swiper对象才会有正常轮播效果
      //   // 利用nextTick()延迟到这次数据更新导致的界面更新后立即执行
      //   this.$nextTick(() => {
      //     new Swiper(this.$refs.swiper, {
      //       // direction: 'vertical', // 垂直切换选项   默认就是horizontal
      //       loop: true, // 循环模式选项
      //       // 如果需要分页器
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
      //       // 如果需要前进后退按钮
      //       navigation: {
      //         nextEl: '.swiper-button-next',
      //         prevEl: '.swiper-button-prev',
      //       },
      //     }) 
      //   })
      // }

      carouselList: {
        handler: function carouselList () { // banners更新了([] ==> [..])
          // 如果没, 直接结束(不需要创建swiper对象)
          if (this.carouselList.length===0) return
          console.log('-------', this.carouselList)

          // 需要在界面更新后创建swiper对象才会有正常轮播效果
          // 利用nextTick()延迟到这次数据更新导致的界面更新后立即执行
          this.$nextTick(() => {
            new Swiper(this.$refs.swiper, {
              // direction: 'vertical', // 垂直切换选项   默认就是horizontal
              loop: true, // 循环模式选项
              autoplay: this.autoplay,
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            }) 
          })
        },
        immediate: true, // 组件对象创建初始化时就会执行第一次   / 默认只在变化后才会调用
      },
    },
}
</script>