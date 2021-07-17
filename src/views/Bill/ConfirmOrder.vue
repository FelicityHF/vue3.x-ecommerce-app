<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>确认订单</template>
  </head-nav-bar>
  <h1>确认订单</h1>
</template>
<script>
import headNavBar from "../../components/headNavBar.vue";
export default {
  name: "ConfirmOrder",
  components: { headNavBar },
  setup() {},
};
</script>