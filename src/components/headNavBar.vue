<template>
  <div class="head-nav-bar">
    <!-- 顶部导航条 每个页面可能都不同，要使用插槽，让父组件自定义 -->
    <div class="iconfont head-nav-bar-left" @click="clickToBack">
      <slot name="left"></slot>
    </div>
    <div class="head-nav-bar-center"><slot>首页</slot></div>
    <div class="iconfont head-nav-bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const clickToBack = () => {
      // router.back();
      // 或者使用router.go(-1)
      router.go(-1);
    };
    return { clickToBack };
  },
};
</script>
<style lang="scss" scoped>
.head-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  // padding: 0 18px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  &-left,
  &-right {
    width: 44px;
  }
  &-center {
    flex: 1;
    overflow: hidden;
  }
}
</style>
