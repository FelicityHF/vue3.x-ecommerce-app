<template>
  <div class="order-detail">
    <head-nav-bar>
      <template v-slot:left>&#xe676;</template>
      <template v-slot:default>订单详情</template>
    </head-nav-bar>
    <div class="order-status"><span class="iconfont">&#xe642;</span>待付款</div>

    <div class="order-address">
      <p class="address-person">
        {{ address.name }}
        <span class="address-phone">{{ address.phone }}</span>
      </p>
      <p class="address-detail">
        {{ address.province + address.city + address.county + address.address }}
      </p>
    </div>

    <div class="products-wrapper" :class="{ 'spread-height': isFold }">
      <van-card
        :num="item.num"
        :price="item.price"
        :title="item.title"
        :thumb="item.cover_url"
        v-for="item in goodsData"
        :key="item.id"
      />
    </div>
    <div class="folder-btn" @click="toggleFolder">查看全部</div>
    <div class="amount-desc">
      <p>商品折扣 <span>-¥0.00</span></p>
      <div class="price-sum">
        共 <i>{{ details.count }}</i> 件商品 |
        <span
          >总价<i>¥{{ details.amount }}</i></span
        >
      </div>
    </div>

    <div class="order-info">
      <p class="title" style="border-bottom: 1px solid rgb(242, 239, 239)">
        订单信息
      </p>
      <p><span>订单编号</span>{{ details.order_no }}</p>
      <p><span>订单时间</span>{{ details.created_at }}</p>
      <p><span>支付方式</span>{{ details.pay_type }}</p>
      <p><span>支付时间</span>{{ details.pay_time }}</p>
      <p><span>物流信息</span>{{ details.express_type }}</p>
    </div>

    <van-submit-bar style="background-color: #f5f5f5" button-text="去支付" />
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { getOrderDetail } from "@/network/order.js";
import { getAddressDetail } from "@/network/address.js";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  name: "OrderDetail",
  components: { headNavBar },
  setup() {
    const route = useRoute();

    const state = reactive({
      details: {},
      address: {},
      goodsData: [],
      isFold: false,
    });

    onMounted(() => {
      const orderId = route.query.id;
      getOrderDetail(orderId, "include=goods,orderDetails").then((res) => {
        console.log("orderdetaillres", res);
        state.details = res;

        console.log("state.goods.data", state.details.goods.data);
        state.goodsData = res.goods.data;

        let numArr = [];
        let totalNum = 0;
        res.orderDetails.data.forEach((item) => {
          numArr.push(item.num);
          totalNum += item.num;
        });
        state.details.count = totalNum;
        state.goodsData.forEach((val, index) => {
          val.num = numArr[index];
        });

        getAddressDetail(res.address_id).then((res) => {
          state.address = res;
        });
      });
    });

    const toggleFolder = () => {
      state.isFold = !state.isFold;
    };
    return { ...toRefs(state), toggleFolder };
  },
};
</script>
<style lang="scss" scoped>
.order-detail {
  padding-top: 44px;
  padding-bottom: 50px;
  .order-status {
    text-align: center;
    background-color: rgb(64, 118, 75);
    color: white;
    padding: 16px 0;
    .iconfont {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .order-address {
    margin: 8px 0 0 18px;
    position: relative;
    padding: 18px;
    border-bottom: 1px solid #f5f5f5;
    .address-detail {
      font-size: 14px;
      color: #666;
      margin-top: 8px;
      margin-right: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .next-arrow {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .products-wrapper {
    height: 104px;
    overflow: hidden;
  }
  .spread-height {
    height: auto;
  }
  .folder-btn {
    // height: 20px;
    text-align: center;
    padding: 10px 0;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #999;
    margin-top: -4px;
  }
  .amount-desc {
    background-color: #f5f5f5;
    p {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgb(242, 239, 239);
      border-bottom: 1px solid rgb(242, 239, 239);
      padding: 10px 18px;
      font-size: 14px;
      color: #777;
    }
    .price-sum {
      text-align: right;
      padding: 10px 18px;
      font-size: 14px;
      color: #777;
      i {
        color: red;
        font-size: 16px;
      }
    }
  }
  .order-info {
    background-color: #f5f5f5;
    margin: 12px 0;
    p {
      display: flex;
      justify-content: space-between;
      //   border-bottom: 1px solid rgb(242, 239, 239);
      padding: 10px 18px;
      font-size: 14px;
      color: #777;
    }
  }
}
</style>