<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>编辑地址</template>
  </head-nav-bar>
  <div class="address-content">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import {
  getAddressDetail,
  updateAddress,
  deleteAddress,
} from "@/network/address.js";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Address",
  components: { headNavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.query.id;
    const state = reactive({
      addressInfo: {},
    });

    onMounted(() => {
      getAddressDetail(id).then((res) => {
        console.log("获取地址详情", res);
        state.addressInfo = res;
        state.addressInfo.tel = state.addressInfo.phone;
        state.addressInfo.isDefault = !!state.addressInfo.is_default; //vant的地址组件，默认值要求是布尔值
        state.addressInfo.addressDetail = state.addressInfo.address;
        // state.addressInfo.areaCode = "150203";
      });
    });
    const onSave = (content) => {
      updateAddress(id, {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: +content.isDefault,
        // areaCode: content.areaCode, //服务器没有这个字段怎么办？
      }).then((res) => {
        console.log("添加地址结果", res);
        if (res.status === 204) {
          Toast.success("添加成功");
          router.push({ path: "/address" });
        } else {
          Toast.fail("添加失败");
        }
      });
    };
    const onDelete = () => {
      deleteAddress(id).then((res) => {
        if (res.status === 204) {
          Toast.success("删除成功");
          router.push({ path: "/address" });
        } else {
          Toast.fail("删除失败");
        }
      });
    };

    return {
      onSave,
      onDelete,
      areaList,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.address-content {
  margin-top: 44px;
}
</style>