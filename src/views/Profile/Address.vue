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
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { ref } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  name: "Address",
  components: { headNavBar },
  setup() {
    const router = useRouter();
    const chosenAddressId = ref("1");
    const list = [
      {
        id: "1",
        name: "张三",
        tel: "13000000000",
        address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
        isDefault: true,
      },
      {
        id: "2",
        name: "李四",
        tel: "1310000000",
        address: "浙江省杭州市拱墅区莫干山路 50 号",
      },
    ];

    const onAdd = () => {
      router.push({ path: "/addaddress" });
    };
    const onEdit = (item, index) => Toast("编辑地址:" + index);

    return {
      list,
      onAdd,
      onEdit,
      chosenAddressId,
    };
  },
};
</script>
<style lang="scss" scoped>
.address-content {
  margin-top: 44px;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>