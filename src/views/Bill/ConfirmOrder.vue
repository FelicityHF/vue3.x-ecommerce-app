<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>确认订单</template>
  </head-nav-bar>
  <div class="confirm-order-content">
    <div class="order-address" @click="goToAddressList">
      <p class="address-person">
        {{ defaultAddress.name }}
        <span class="address-phone">{{ defaultAddress.phone }}</span>
      </p>
      <p class="address-detail">
        {{
          defaultAddress.province +
          defaultAddress.city +
          defaultAddress.county +
          defaultAddress.address
        }}
      </p>
      <span class="iconfont next-arrow">&#xe62f;</span>
    </div>
    <van-card
      :num="item.num"
      :price="item.goods.price"
      desc="描述信息"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
      lazy-load
      v-for="item in cartItems"
      :key="item.id"
    />
  </div>
  <van-submit-bar
    :price="totalAmount * 100"
    button-text="提交订单"
    @submit="onSubmit"
  />
</template>
<script>
import headNavBar from "../../components/headNavBar.vue";
import { orderPreview, submitOrder } from "@/network/order.js";
import { onMounted, ref, reactive, toRefs, computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  name: "ConfirmOrder",
  components: { headNavBar },
  setup() {
    const router = useRouter();
    const state = reactive({
      defaultAddress: {},
      cartItems: [],
    });

    onMounted(() => {
      orderPreview().then((res) => {
        console.log("orderpreview", res);

        state.cartItems = res.carts;

        state.defaultAddress = res.address.filter((item) => {
          return item.is_default === 1;
        })[0];
      });
    });

    const totalAmount = computed(() => {
      return state.cartItems.reduce((sum, item) => {
        sum += item.num * item.goods.price;
        return sum;
      }, 0);
    });

    const goToAddressList = () => {
      router.push({ path: "address" });
    };

    const onSubmit = () => {
      const address_id = state.defaultAddress.id;
      submitOrder({ address_id }).then((res) => {
        console.log("提交订单", res);
        router.push({ path: "/pay" });
      });
    };
    return { ...toRefs(state), goToAddressList, onSubmit, totalAmount };
  },
};
</script>
<style lang="scss" scoped>
.confirm-order-content {
  margin-top: 44px;
  .order-address {
    margin: 12px 0 0 18px;
    position: relative;
    padding: 18px;
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
}
</style>