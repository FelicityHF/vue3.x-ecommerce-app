<template>
  <div class="product-item" @click="clickItem(goodsItem.id)">
    <img v-lazy="goodsItem.cover_url" alt="" />
    <div class="product-title">{{ goodsItem.title }}</div>
    <p class="product-sales">
      <i class="product-rate">32份评价</i>
      <span class="product-price">¥{{ goodsItem.price }}</span>
    </p>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const router = useRouter();
    const clickItem = (id) => {
      router.push({ path: "/detail", query: { id } });
    };
    return { clickItem };
  },
};
</script>
<style lang="scss" scoped>
.product-item {
  width: 50%;
  height: auto;
  padding: 10px 18px;
  font-size: 14px;
  box-sizing: border-box;
  img {
    width: 100%;
  }
  .product-title {
    text-align: center;
  }
  .product-sales {
    text-align: center;
    font-size: 12px;
    .product-rate {
      font-style: normal;
      // color: green;
      margin-right: 8px;
    }
    .product-price {
      color: red;
      font-size: 14px;
    }
  }
}
</style>