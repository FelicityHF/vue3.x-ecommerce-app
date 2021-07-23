<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>地址管理</template>
  </head-nav-bar>
  <div class="address-content">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <div class="no-address" v-if="isEmptyShow">
      <div class="iconfont">&#xe60b;</div>
      你的地址空空如也～
    </div>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { getAddressList } from "@/network/address.js";
import { onMounted, reactive, ref, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  name: "Address",
  components: { headNavBar },
  setup() {
    const router = useRouter();
    const chosenAddressId = ref("1");
    const state = reactive({
      list: [],
    });
    const isEmptyShow = ref(false);
    onMounted(() => {
      getAddressList().then((res) => {
        console.log(res);
        if (!res.data.length) isEmptyShow.value = true;
        state.list = res.data;
        state.list.map((item) => {
          item.address = item.province + item.city + item.county + item.address;
          item.tel = item.phone;
          item.isDefault = item.is_default;
        });
      });
    });

    const onAdd = () => {
      router.push({ path: "/addaddress" });
    };
    const onEdit = (item) => {
      console.log("编辑地址入口", item);
      const id = item.id;
      router.push({ path: "/editaddress", query: { id } });
    };

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      chosenAddressId,
      isEmptyShow,
    };
  },
};
</script>
<style lang="scss" scoped>
.address-content {
  margin-top: 44px;
  .van-address-list__bottom {
    .van-button {
      background-color: green;
    }
  }
  .no-address {
    text-align: center;
    .iconfont {
      font-size: 60px;
      margin-bottom: 20px;
    }
  }
}
</style>