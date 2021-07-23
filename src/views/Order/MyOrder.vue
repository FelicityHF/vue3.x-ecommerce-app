<template>
  <div class="order-content">
    <head-nav-bar>
      <template v-slot:left>&#xe676;</template>
      <template v-slot:default>我的订单</template>
    </head-nav-bar>
    <van-tabs
      style="position: fixed; top: 44px; width: 100%; margin-bottom: 20px"
      v-model:active="active"
    >
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="已取消"></van-tab>
      <van-tab title="退款/售后"></van-tab>
    </van-tabs>
    <div class="order-list">
      <div
        class="order-card"
        v-for="item in orders"
        :key="item.id"
        @click="clickToDetail(item.id)"
      >
        <div class="order-card-title">
          <h3 class="shop-name">订单：{{ item.order_no }}</h3>
          <span class="order-status">{{ item.status }}</span>
        </div>
        <div class="order-items">
          <div class="items-imgs">
            <span
              class="img-wrapper"
              v-for="(img, index) in item.orderImgs"
              :key="index"
            >
              <img :src="img" alt="" />
            </span>
          </div>
          <div class="items-sum">
            <i class="items-amount">¥{{ item.amount }}</i>
            <p class="items-quantity">共{{ item.orderNum }}件</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { getOrderList } from "@/network/order.js";
import { ref, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "MyOrder",
  components: { headNavBar },
  setup() {
    const router = useRouter();
    const active = ref(2);
    const state = reactive({
      orders: [],
    });

    onMounted(() => {
      getOrderList("include=goods,orderDetails").then((res) => {
        console.log("orderlist", res);
        state.orders = res.data;
        state.orders.forEach((item) => {
          if (item.status === 1) item.status = "待支付";
          else if (item.status === 2) item.status = "已付款";
          else item.status = "已完成";

          item.orderNum = item.orderDetails.data.reduce((sum, value) => {
            sum += value.num;
            return sum;
          }, 0);
          const imgArr = [];
          item.goods.data.forEach((val) => {
            imgArr.push(val.cover_url);
          });
          item.orderImgs = imgArr;
        });
      });
    });

    //去往订单详情
    const clickToDetail = (id) => {
      router.push({ path: "/orderdetail", query: { id } });
    };
    return { active, ...toRefs(state), clickToDetail };
  },
};
</script>
<style lang="scss" scoped>
.order-content {
  padding-top: 88px;
  min-height: 100vh;
  background-color: #f5f5f5;
  .order-list {
    .order-card {
      margin: 14px 18px;
      padding: 16px;
      background: #fff;
      border-radius: 4px;
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-bottom: 12px;
        h3 {
          margin: 0;
          font-weight: 400;
          font-size: 14px;
          color: #555;
        }
        .order-status {
          color: #333;
          font-weight: 700;
        }
      }
      .order-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .items-imgs {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 6px;
            vertical-align: bottom;
          }
        }
        .items-sum {
          line-height: 20px;
          text-align: right;
          font-size: 12px;
          .items-amount {
            font-style: normal;
            color: red;
            margin-bottom: 6px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>