<template>
  <div class="product-list">
    <product-item
      v-for="item in goodsData"
      :key="item.title"
      v-bind:goodsItem="item"
    ></product-item>
  </div>
</template>
<script>
import productItem from "@/components/content/goods/productItem.vue";
// import { getGoodsData } from "@/network/goods.js";
// import { onMounted, ref } from "vue";
export default {
  components: { productItem },
  props: {
    goodsData: Object,
    default() {
      return {};
    },
  },
  setup() {
    // const goodsData = ref([]);
    // onMounted(() => {
    //   getGoodsData().then((res) => {
    //     console.log("goods", res);
    //     goodsData.value = res.goods.data;
    //   });
    // });
    // return { goodsData };
  },
};
</script>
<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-flow: wrap;
  background-color: #fff;
  margin-bottom: 50px;
}
</style>