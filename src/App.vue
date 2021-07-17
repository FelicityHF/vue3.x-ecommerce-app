<template>
  <router-view />
  <!-- 有条件的缓存 -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <tab-bar-nav v-if="isShowNav"></tab-bar-nav>
</template>
<script>
// import tabBarNav from "./components/tabBarNav.vue";
import tabBarNav from "@/components/tabBarNav.vue";
// import { ref, toRefs } from "vue";
export default {
  name: "App",
  components: { tabBarNav },
  data() {
    return {
      isShowNav: true,
      showNavList: ["/", "/home", "/category", "/cart", "/profile"],
    };
  },
  // setup() {
  //   const isShowNav = ref(true);
  //   const showNavList = ref(["/", "/home", "/category", "/cart", "/usercenter"]);
  //   return { isShowNav, showNavList };
  // },
  watch: {
    $route(to, from) {
      // 通过路径判断哪些页面需求底部导航
      if (this.showNavList.includes(to.path)) {
        this.isShowNav = true;
      } else {
        this.isShowNav = false;
      }
    },
  },
};
</script>

<style lang="scss">
// @import "./assets/css/base.scss";
</style>
