<template>
  <div id="home">
    <head-nav-bar>
      <template v-slot:left>&#xe930;</template>
      <template v-slot:default>
        <input class="head-nav-searchbox" type="search" placeholder="理发器" />
      </template>
      <template v-slot:right>&#xe679;</template>
    </head-nav-bar>
    <tab-card
      v-if="isFixedTabShow"
      :titles="['畅销', '新书', '精选']"
      v-on:changeTab="clickTab"
    >
    </tab-card>
    <div class="bscroll">
      <div class="bscroll-container">
        <div class="banner-recommend-wrapper" ref="topboxref">
          <slides v-bind:bannerSlideData="bannerSlideData"></slides>
          <recommend v-bind:recommendData="recommendData"></recommend>
        </div>
        <div class="home-products-list">
          <tab-card
            :titles="['畅销', '新书', '精选']"
            v-on:changeTab="clickTab"
          >
          </tab-card>
          <product-list v-bind:goodsData="currentTabGoods"></product-list>
        </div>
      </div>
    </div>

    <back-to-top
      v-show="isFixedTabShow"
      v-on:clickBackTop="clickBackTop"
    ></back-to-top>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import tabCard from "@/components/tabCard.vue";
import recommend from "./recommend.vue";
import slides from "./slides.vue";
import backToTop from "@/components/backToTop.vue";
import {
  ref,
  toRefs,
  onMounted,
  reactive,
  computed,
  watchEffect,
  nextTick,
} from "vue";
import { getHomeAllData, getHomeGoods } from "@/network/home.js";
import ProductList from "../../components/content/goods/productList.vue";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);

export default {
  name: "Home",
  components: {
    headNavBar,
    slides,
    recommend,
    tabCard,
    ProductList,
    backToTop,
  },
  setup() {
    // banner slides 数据
    const bannerSlideData = ref([]);
    const recommendData = ref([]);
    // 固定的tab
    let isFixedTabShow = ref(false);
    let topboxref = ref(null);

    // 首页商品列表，三个tab里的数据存储
    const goodsData = reactive({
      sales: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
      new: { page: 0, list: [] },
    });

    // 当前显示的tab
    let currentType = ref("sales");
    // 切换tab
    const clickTab = (index) => {
      let tabs = ["sales", "recommend", "new"];
      currentType.value = tabs[index.value];
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    };
    const currentTabGoods = computed(() => {
      return goodsData[currentType.value].list;
    });

    let bscroll = reactive({});
    //在页面创建完成后会自动加载
    onMounted(() => {
      getHomeAllData()
        .then((res) => {
          // console.log("请求首页所有的数据", res);
          bannerSlideData.value = res.slides;
          console.log(bannerSlideData);
          recommendData.value = res.goods.data;
        })
        .catch((err) => {});

      //默认获取热销tab下的数据
      getHomeGoods("sales").then((res) => {
        goodsData.sales.list = res.goods.data;
      });
      getHomeGoods("recommends").then((res) => {
        goodsData.recommend.list = res.goods.data;
      });
      getHomeGoods("new").then((res) => {
        goodsData.new.list = res.goods.data;
      });

      //BScroll配置
      let bscrollDOM = document.querySelector(".bscroll");
      bscroll = new BScroll(bscrollDOM, {
        probeType: 3,
        click: true,
        pullUpLoad: true, //上拉加载更多
        scrollY: true,
      });
      //触发滚动事件
      bscroll.on("scroll", (position) => {
        // console.log("滚动的position", position.y);
        isFixedTabShow.value = -position.y >= topboxref.value.offsetHeight + 10;
      });
      //上拉加载更多数据触发pullingUp
      bscroll.on("pullingUp", () => {
        // console.log("上拉加载", document.querySelector(".bscroll-container").clientHeight);

        //获取数据
        const page = goodsData[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          // console.log("上拉获取的数据", res);
          goodsData[currentType.value].list.push(...res.goods.data);
          goodsData[currentType.value].page += 1;
        });
        //完成上拉，将新数据展示出来
        bscroll.finishPullUp();
        console.log("当前tab类型" + currentType.value, "当前页" + page);
        //重新计算高度
        bscroll.refresh();
      });
    });

    // 监听 任何一个变量有变化就会触发
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    });

    // backtotop
    const clickBackTop = () => {
      // console.log("回到顶部");
      bscroll.scrollTo(0, 0, 500);
    };

    return {
      recommendData,
      clickTab,
      currentTabGoods,
      isFixedTabShow,
      topboxref,
      clickBackTop,
      bannerSlideData,
    };
  },
};
</script>
<style lang="scss" scoped>
#home {
  position: relative;
  background-color: rgb(238, 236, 236);
  height: 100vh;
  // margin-top: 44px;
  .head-nav-searchbox {
    width: 90%;
    height: 100%;
    border-radius: 20px;
    background: #fff;
    padding: 2px 20px;
    border: 1px solid #f5f5f5;
  }
  .bscroll {
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    // background-color: red;
    overflow: hidden;
  }
}
</style>