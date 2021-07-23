<template>
  <!-- <router-view /> -->
  <!-- 有条件的缓存 -->
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['OrderDetail', 'Detail']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <tab-bar-nav v-if="isShowNav"></tab-bar-nav>
</template>
<script>
import tabBarNav from "@/components/tabBarNav.vue";
import { useStore } from "vuex";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "App",
  components: { tabBarNav },
  data() {
    return {
      // isShowNav: true,
      // showNavList: ["/", "/home", "/category", "/cart", "/profile"],
    };
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const isShowNav = ref(true);
    const showNavList = ref(["/", "/home", "/category", "/cart", "/profile"]);

    onMounted(() => {
      store.dispatch("updateCart");
    });
    watch(
      () => route.path,
      (to, from) => {
        // console.log("监听到变化", to, from);
        if (showNavList.value.includes(to)) {
          isShowNav.value = true;
        } else {
          isShowNav.value = false;
        }
      }
    );

    return { isShowNav };
  },

  // watch: {
  //   $route(to, from) {
  //     // 通过路径判断哪些页面需求底部导航
  //     if (this.showNavList.includes(to.path)) {
  //       this.isShowNav = true;
  //     } else {
  //       this.isShowNav = false;
  //     }
  //   },
  // },
};
</script>

<style lang="scss">
// @import "./assets/css/base.scss";
</style>
