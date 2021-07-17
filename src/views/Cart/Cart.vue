<template>
  <head-nav-bar>
    <template v-slot:default>购物车</template>
  </head-nav-bar>
  <div class="cart-list">
    <p>列表</p>
    <van-badge :content="100" max="99">
      <router-link class="bill-link" to="/bill">去结算</router-link>
      <div class="child" />
    </van-badge>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
export default {
  name: "Cart",
  components: { headNavBar },
  setup() {},
};
</script>
<style lang="scss" scoped>
.cart-list {
  margin-top: 44px;
  .bill-link {
    display: block;
    padding: 10px 20px;
    background-color: tomato;
    color: white;
  }
}
</style>