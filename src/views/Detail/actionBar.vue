<template>
  <van-action-bar class="product-detail-action-bar">
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
    <van-action-bar-button
      type="warning"
      text="加入购物车"
      @click="clickToCart"
    />
    <van-action-bar-button type="danger" text="立即购买" @click="goToCart" />
  </van-action-bar>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "axios";
import { Toast } from "vant";
import { addCart } from "@/network/cart.js";
export default {
  name: "actionBar",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const productId = route.query.id;
    // const store = useStore();

    //加入购物车
    const clickToCart = () => {
      //处理加入购物车时检测用户状态未登录先登录
      if (!localStorage.isLogin) {
        router.push({ path: "/login" });
      }
      addCart({ goods_id: productId, num: 1 }).then((res) => {
        console.log("cart", res);
        //会有两种情况，返回的状态码201 或者 204（已有过的）
        if (res.status === 204 || res.status === 201) {
          //同步购物车数据到vuex
          // store.commit("addToCart");

          //提示加入成功
          Toast.success("加入成功");
        }
      });
    };

    //立即购买  去购物车
    const goToCart = () => {
      //处理加入购物车时检测用户状态未登录先登录
      if (!localStorage.isLogin) {
        router.push({ path: "/login" });
      }
      addCart({ goods_id: productId, num: 1 }).then((res) => {
        console.log("cart", res);
        //会有两种情况，返回的状态码201 或者 204（已有过的）
        if (res.status === 204 || res.status === 201) {
          //同步购物车数据到vuex
          // store.commit("addToCart");
          router.push({ path: "/cart" });
        }
      });
    };
    return { clickToCart, goToCart, productId };
  },
};
</script>
<style lang="scss" scoped>
.product-detail-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>