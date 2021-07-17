<template>
  <van-action-bar class="product-detail-action-bar">
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>
<script>
export default {
  name: "actionBar",
  setup() {},
};
</script>
<style lang="scss" scoped>
.product-detail-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>