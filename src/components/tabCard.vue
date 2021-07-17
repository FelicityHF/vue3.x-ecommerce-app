<template>
  <div class="tab-card">
    <div
      class="tab-card-item"
      :class="{ 'active-tab': currentIndex === index }"
      v-for="(item, index) in titles"
      :key="item"
      @click="changeTab(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    titles: Array,
    default() {
      return [];
    },
  },
  setup(props, { emit }) {
    let currentIndex = ref(0);
    const changeTab = (index) => {
      currentIndex.value = index;
      emit("changeTab", currentIndex);
    };
    return { currentIndex, changeTab };
  },
};
</script>
<style lang="scss" scoped>
.tab-card {
  // 使用粘性定位实现tab在滑动中固定在顶部 CSS3
  position: sticky;
  top: 44px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  z-index: 9;
  .tab-card-item {
    flex: 1;
    padding: 6px 0;
    text-align: center;
    font-size: 14px;
  }
  .active-tab {
    color: green;
    span {
      border-bottom: 2px solid green;
      padding-bottom: 4px;
    }
  }
}
</style>