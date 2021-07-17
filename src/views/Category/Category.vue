<template>
  <head-nav-bar>
    <template v-slot:default>分类</template>
  </head-nav-bar>
  <div class="category-content">
    <van-sidebar class="category-content-left-tabs" v-model="activeSideNav">
      <van-collapse v-model="activeSideChild" accordion>
        <van-collapse-item
          v-for="(item, index) in categoryTabs"
          :key="item.id"
          :title="item.name"
          :name="index"
        >
          <van-sidebar-item
            v-for="child in item.children"
            :key="child.id"
            :title="child.name"
            @click="onSideNavChange(child.id)"
          />
        </van-collapse-item>
      </van-collapse>
    </van-sidebar>
    <div class="category-content-right-list">
      <van-tabs
        class="category-content-right-list-tabs"
        v-model:active="activeSortTab"
        @click="clickSortTab"
      >
        <van-tab title="销量排序"></van-tab>
        <van-tab title="价格排序"></van-tab>
        <van-tab title="评论排序"></van-tab>
      </van-tabs>
      <div class="bscroll">
        <div class="bscroll-content">
          <div class="goods-list">
            <van-card
              @click="clickItem(item.id)"
              v-for="item in showGoods"
              :key="item.id"
              num="0"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
              origin-price="10.00"
            />
          </div>
        </div>
      </div>
    </div>
    <back-to-top
      v-show="isBackTopShow"
      v-on:clickBackTop="clickBackTop"
    ></back-to-top>
  </div>
</template>
<script>
import HeadNavBar from "../../components/headNavBar.vue";
import backToTop from "@/components/backToTop.vue";
import { getGoodsData, getCategoryGoods } from "@/network/goods.js";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
import { useRouter } from "vue-router";
export default {
  name: "Category",
  components: { HeadNavBar, backToTop },
  setup() {
    // 左侧分类
    const categoryTabs = ref([]);
    //数据模型
    const goodsList = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    const router = useRouter();

    //bscroll
    let bscroll = reactive({});
    //backtotop
    const isBackTopShow = ref(false);

    const activeSideNav = ref(0);
    const activeSortTab = ref("a");
    const activeSideChild = ref(0);
    // 当前排序选项卡
    let currentSortTab = ref("sales");
    //通过分类tab获取对应id的数据
    let currentSideTabId = ref(0);

    // 计算属性
    const showGoods = computed(() => {
      return goodsList[currentSortTab.value].list;
    });
    console.log("showGoods", showGoods);
    const init = () => {
      getCategoryGoods("sales", currentSideTabId.value).then((res) => {
        console.log("初始化", res);
        goodsList.sales.list = res.goods.data;
      });
      getCategoryGoods("price", currentSideTabId.value).then((res) => {
        console.log("初始化", res);
        goodsList.price.list = res.goods.data;
      });
      getCategoryGoods("comment_count", currentSideTabId.value).then((res) => {
        console.log("初始化", res);
        goodsList.comments_count.list = res.goods.data;
      });
    };
    onMounted(() => {
      getGoodsData().then((res) => {
        console.log(res);
        categoryTabs.value = res.categories;
        goodsList.value = res.goods.data;
      });

      getCategoryGoods("sales", currentSideTabId.value).then((res) => {
        console.log("初始化", res);
        goodsList.sales.list = res.goods.data;
      });

      //Bscroll配置
      let bscrollDOM = document.querySelector(".bscroll");
      bscroll = new BScroll(bscrollDOM, {
        probeType: 3,
        click: true,
        pullUpLoad: true,
        scrollY: true,
      });
      bscroll.on("scroll", (position) => {
        // console.log("postiondY:" + position.y, "window高度" + window.innerHeight);
        isBackTopShow.value = -position.y >= window.innerHeight;
      });

      bscroll.on("pullingUp", () => {
        console.log("上拉加载");
        //上拉加载更多数据
        const page = goodsList[currentSortTab.value].page + 1;
        getCategoryGoods(
          currentSortTab.value,
          currentSideTabId.value,
          page
        ).then((res) => {
          console.log("返回数据的length", res.goods.data.length);
          if (res.goods.data.length <= 0) return;
          goodsList[currentSortTab.value].list.push(...res.goods.data);
          goodsList[currentSortTab.value].page += 1;
        });
        //完成上拉，将数据展示出来
        bscroll.finishPullUp();
        console.log(
          "当前page页:" + page,
          "当前排序类型:" + currentSortTab.value
        );
        //重新计算高度
        nextTick(() => {
          //重新计算高度
          bscroll && bscroll.refresh();
        });
      });
    });
    // 监听 任何一个变量有变化就会触发
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    });

    // 排序tab
    let sortArr = ["sales", "price", "comments_count"];
    const clickSortTab = (index) => {
      currentSortTab.value = sortArr[index];
      getCategoryGoods(currentSortTab.value, currentSideTabId.value).then(
        (res) => {
          goodsList[currentSortTab.value].list = res.goods.data;
        }
      );
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    };
    // 切换 sidenav tab
    const onSideNavChange = (childId) => {
      currentSideTabId.value = childId;
      console.log(
        "tabID:" + currentSideTabId.value,
        "sortname:" + currentSortTab.value
      );
      init();
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    };
    //商品详情链接
    const clickItem = (id) => {
      router.push({ path: "/detail", query: { id } });
    };

    //点击回到顶部
    const clickBackTop = () => {
      // console.log("回到顶部");
      bscroll.scrollTo(0, 0, 500);
    };
    return {
      categoryTabs,
      activeSideNav,
      activeSortTab,
      onSideNavChange,
      goodsList,
      activeSideChild,
      clickSortTab,
      currentSortTab,
      currentSideTabId,
      showGoods,
      isBackTopShow,
      clickBackTop,
      clickItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.category-content {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  overflow: hidden;
  &-left-tabs {
    width: 110px;
    height: 100%;
    background-color: rgb(247, 248, 250);
    text-align: center;
    overflow-y: scroll;
    border-right: 1px solid #f5f5f5;
    .van-sidebar .van-collapse .van-collapse-item {
      .van-cell {
        // background-color: red;
      }
    }
    .van-sidebar-item {
      background-color: #fff;
      padding: 10px 2px;
      white-space: nowrap;
      font-size: 12px;
      overflow: hidden;
    }
    .van-sidebar-item--select {
      color: green;
    }
    .van-sidebar-item--select::before {
      display: none;
    }
  }
  &-right-list {
    flex: 1;
    height: 100%;
    overflow-y: scroll;

    &-tabs {
      height: 44px;
      // background-color: tomato;
      border-bottom: 1px solid #f5f5f5;
    }
    .bscroll {
      position: absolute;
      top: 44px;
      left: 112px;
      right: 0;
      bottom: 0;
      // background-color: red;
      overflow: hidden;
    }
    .van-card {
      background-color: #fff;
    }
  }
}
</style>