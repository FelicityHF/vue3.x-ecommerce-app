<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>详情</template>
  </head-nav-bar>
  <!-- <tab-card
    v-if="isFixedTabShow"
    :titles="['概述', '评论', '相似商品']"
    v-on:changeTab="clickTab"
  >
  </tab-card> -->
  <van-tabs
    class="detail-tabs"
    v-model:active="activeTab"
    v-if="isFixedTabShow"
  >
    <van-tab title="概述">
      <div class="product-details" v-html="detail.details"></div
    ></van-tab>
    <van-tab title="评论">
      <!-- <div
          class="comments-list"
          v-for="item in detail.comments"
          :key="item"
        ></div> -->
      评论里没有数据？？/
    </van-tab>
    <van-tab title="相似商品">
      <product-list v-bind:goodsData="likeGoods"></product-list>
    </van-tab>
  </van-tabs>

  <div class="bscroll">
    <div class="detail-content">
      <div class="top-section-for-scr" ref="topboxref">
        <div class="img-wrapper">
          <img v-lazy="detail.cover_url" alt="" />
        </div>
        <div class="product-desc">
          <p class="price">
            <i>¥{{ detail.price }}</i>
            <span class="iconfont collect-icon">&#xe630;</span>
          </p>
          <h2 class="product-title">{{ detail.title }}</h2>
          <p class="product-intro">{{ detail.description }}</p>
        </div>
      </div>
      <!-- <tab-card :titles="['概述', '评论', '相似商品']" v-on:changeTab="clickTab">
    </tab-card> -->
      <van-tabs class="detail-tabs" v-model:active="activeTab">
        <van-tab title="概述">
          <div class="product-details" v-html="detail.details"></div
        ></van-tab>
        <van-tab title="评论">
          <!-- <div
          class="comments-list"
          v-for="item in detail.comments"
          :key="item"
        ></div> -->
          评论里没有数据？？/
        </van-tab>
        <van-tab title="相似商品">
          <product-list v-bind:goodsData="likeGoods"></product-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <action-bar></action-bar>
</template>
<script>
import headNavBar from "../../components/headNavBar.vue";
import actionBar from "./actionBar.vue";
// import tabCard from "@/components/tabCard.vue";
import ProductList from "../../components/content/goods/productList.vue";
import { useRoute } from "vue-router";
import { ref, reactive, toRefs, onMounted } from "vue";
import { getDetailData } from "@/network/detail.js";
import BScroll from "@better-scroll/core";

export default {
  name: "Detail",
  components: { headNavBar, actionBar, ProductList },
  setup() {
    const route = useRoute();
    const thisGoodsData = reactive({
      detail: {},
      likeGoods: [],
    });
    // 固定的tab
    let activeTab = ref(0);

    let bscroll = reactive({});
    let isFixedTabShow = ref(false);
    let topboxref = ref(null);

    // 切换tab
    // const clickTab = (index) => {
    //   let tabs = ["detail", "comments", "likeGoods"];
    //   currentType.value = tabs[index.value];
    // };
    // const currentTabData = computed(() => {
    //   return thisGoodsData[currentType.value].list;
    // });
    onMounted(() => {
      getDetailData(route.query.id).then((res) => {
        console.log("getDetailData", res);
        thisGoodsData.detail = res.goods;
        thisGoodsData.likeGoods = res.like_goods;
      });

      //BScroll配置
      let bscrollDOM = document.querySelector(".bscroll");
      bscroll = new BScroll(bscrollDOM, {
        probeType: 3,
        click: true,
        scrollY: true,
      });
      //触发滚动事件
      bscroll.on("scroll", (position) => {
        // console.log("滚动的position", position.y);
        isFixedTabShow.value = -position.y >= topboxref.value.offsetHeight + 90;
      });
    });
    return { ...toRefs(thisGoodsData), activeTab, topboxref, isFixedTabShow };
  },
};
</script>
<style lang="scss" scoped>
.bscroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
}
.detail-content {
  margin-top: 44px;
  .img-wrapper {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
    img {
      width: 100%;
    }
  }
  .product-desc {
    padding: 10px 18px;
    .product-title {
      font-size: 16px;
    }
    .product-intro {
      margin-top: 0;
    }
    .price {
      display: flex;
      justify-content: space-between;
      color: red;
      i {
        font-style: normal;
        font-size: 18px;
        font-weight: 700;
      }
      .collect-icon {
        color: tomato;
        font-size: 16px;
      }
    }
  }
  .van-tabs .van-tabs__wrap {
    position: sticky;
    top: 0;
  }
}
</style>