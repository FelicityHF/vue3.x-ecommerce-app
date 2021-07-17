<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in bannerSlideData" :key="item.id">
      <a class="banner-link" :href="item.url">
        <img alt="" v-lazy="item.img_url" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "slides",
  props: {
    bannerSlideData: Array,
    default() {
      return [];
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  // background-color: #39a9ed;
  .banner-link {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>