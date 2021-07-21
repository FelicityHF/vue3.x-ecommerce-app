<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>新增地址</template>
  </head-nav-bar>
  <div class="address-content">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { ref } from "vue";
import { Toast } from "vant";
export default {
  name: "Address",
  components: { headNavBar },
  setup() {
    const searchResult = ref([]);

    const onSave = () => Toast("save");
    const onDelete = () => Toast("delete");
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        searchResult.value = [];
      }
    };

    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
    };
  },
};
</script>
<style lang="scss" scoped>
.address-content {
  margin-top: 44px;
}
</style>