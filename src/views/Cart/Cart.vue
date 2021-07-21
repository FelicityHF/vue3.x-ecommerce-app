<template>
  <head-nav-bar>
    <template v-slot:default>购物车</template>
  </head-nav-bar>
  <div class="cart-list">
    <van-checkbox-group
      v-model="checked"
      ref="checkboxGroup"
      @change="groupChange(checked)"
    >
      <van-swipe-cell v-for="item in list" :key="item.id">
        <div class="cart-item-wrapper">
          <van-checkbox :name="item.id"></van-checkbox>
          <div class="item-img-wrapper">
            <img class="item-img" v-lazy="item.goods.cover_url" alt="" />
          </div>
          <div class="item-title-price">
            <div class="item-title">{{ item.goods.title }}</div>
            <p class="item-price-count">
              <i class="item-price">¥{{ item.goods.price }}</i>
              <span class="item-count">X {{ item.num }}</span>
            </p>
          </div>
          <van-stepper
            class="item-operate"
            :min="1"
            :max="item.goods.stock"
            button-size="24px"
            input-width="20px"
            integer
            v-model="item.num"
            :name="item.id"
            @change="updateCart(item.num, item.id)"
          />
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="deleteItem(item.id)"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>

    <div class="bill-action-bar">
      <van-checkbox v-model:checked="allChecked" @click="changeAll"
        >全选</van-checkbox
      >
      <div class="totoal-amount">
        合计：<i class="amount">¥{{ getTotalAmount }}</i>
      </div>
      <router-link class="bill-link" to="/bill">去结算</router-link>
    </div>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { ref, toRefs, reactive, onMounted, computed } from "vue";
import {
  getCartList,
  modifyCart,
  checkedCart,
  removeCartItem,
} from "@/network/cart.js";
// import { useStore } from "vuex";
import { Toast } from "vant";
import { useStore } from "vuex";

export default {
  name: "Cart",
  components: { headNavBar },
  setup() {
    // const { checked, checkboxGroup, changeAll, allChecked } = useChooseCart();
    const store = useStore();
    //购物车数据模型
    const state = reactive({
      list: [],
      checked: [],
      allChecked: false,
    });

    //初始化购物车列表
    const init = () => {
      Toast.loading({ message: "加载中...", forbidClick: true });

      getCartList("include=goods").then((res) => {
        state.list = res.data;
        // console.log("购物车", state.list);

        state.checked = res.data
          .filter((item) => item.is_checked === 1)
          .map((item) => item.id);
        Toast.clear();
        // console.log(state.checked);
      });
    };

    onMounted(() => {
      init();
    });

    //改变商品数量更新到服务器
    const updateCart = (count, id) => {
      Toast.loading({ message: "处理中", forbidClick: true });
      modifyCart(id, { num: count }).then((res) => {
        console.log("modify", res);
        //将在onMounted 中的list里的num也要改变
        state.list.forEach((item) => {
          if (item.id === id) {
            item.num = count;
          }
        });
        Toast.clear();
      });
    };

    //复选框改变处理
    const groupChange = (checked) => {
      if (checked.length === state.list.length) {
        state.allChecked = true;
      } else {
        state.allChecked = false;
      }
      state.checked = checked;
      checkedCart({ cart_ids: checked });
    };
    //全选 反选
    const changeAll = () => {
      if (!state.allChecked) {
        state.checked = state.list.map((item) => item.id);
        state.allChecked = true;
      } else {
        state.checked = [];
        state.allChecked = false;
      }
    };

    //商品总金额
    // let totalAmount = ref(0);
    const getTotalAmount = computed(() => {
      return state.list
        .filter((item) => state.checked.includes(item.id))
        .reduce((sum, item) => {
          sum += item.goods.price * item.num;
          return sum;
        }, 0);
    });

    //删除
    const deleteItem = (id) => {
      removeCartItem(id);
      init();
      store.dispatch("updateCart");
    };

    return {
      groupChange,
      changeAll,
      ...toRefs(state),
      updateCart,
      getTotalAmount,
      deleteItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  // width: 100%;
  margin-top: 44px;
  margin-bottom: 94px;
  padding: 0 18px;
  overflow-y: scroll;
  .cart-item-wrapper {
    // width: 100%;
    display: flex;
    // background-color: pink;
    align-items: center;
    // justify-content: space-between;
    padding: 16px 0;
    .item-img-wrapper {
      width: 60px;
      height: 70px;
      overflow: hidden;
      margin: 0 10px;
      img.item-img {
        width: 100%;
      }
    }
    .item-title-price {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      .item-title {
        // white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 12px;
        // max-width: 100%;
        font-size: 14px;
      }
      .item-price {
        color: red;
        font-weight: 700;
        margin-right: 6px;
      }
      .item-count {
        font-size: 12px;
        margin-bottom: 6px;
      }
    }
    // .item-operate {
    //   // align-self: flex-end;
    // }
  }
  .delete-button {
    height: 100%;
  }
  .bill-action-bar {
    font-size: 14px;
    background-color: #f5f5f5;
    position: fixed;
    // width: 100%;
    height: 44px;
    left: 0;
    right: 0;
    bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    .totoal-amount {
      flex: 1;
      margin-left: 16px;
      .amount {
        color: red;
        font-weight: 700;
        font-size: 16px;
      }
    }
    .bill-link {
      display: block;
      width: 100px;
      height: 30px;
      // padding: 10px 20px;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      background-color: tomato;
      color: white;
    }
  }
}
</style>