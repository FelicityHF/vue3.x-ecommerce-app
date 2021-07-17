<template>
  <div class="back-to-top" @click="clickBackTop">
    <div class="iconfont back-to-top-icon">&#xe61d;</div>
  </div>
</template>
<script>
export default {
  setup(props, { emit }) {
    const clickBackTop = () => {
      emit("clickBackTop");
    };

    return { clickBackTop };
  },
};
</script>
<style lang="scss" scoped>
.back-to-top {
  width: 36px;
  height: 36px;
  position: fixed;
  bottom: 62px;
  right: 10px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  &-icon {
    font-size: 26px;
    color: rgb(115, 148, 115);
  }
}
</style>