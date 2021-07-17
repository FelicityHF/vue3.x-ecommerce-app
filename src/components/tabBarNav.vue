<template>
  <div class="tab-bar-nav">
    <ul class="tab-bar-nav-ul">
      <li class="tab-bar-nav-ul-li" v-for="item in tabList" :key="item.text">
        <router-link class="nav-link" :to="item.path">
          <div class="iconfont tab-bar-nav-icon" v-html="item.icon"></div>
          {{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tabBarNav",
  setup() {
    const tabList = [
      { path: "/", text: "首页", icon: "&#xe674;" },
      { path: "/category", text: "分类", icon: "&#xe675;" },
      { path: "/cart", text: "购物车", icon: "&#xe992;" },
      { path: "/profile", text: "我的", icon: "&#xe99e;" },
    ];
    return { tabList };
  },
};
</script>
<style lang="scss" scoped>
.tab-bar-nav {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid rgb(240, 238, 238);
  &-ul {
    display: flex;
    align-items: center;
    height: 100%;
    &-li {
      width: 25%;
      height: 100%;
      .nav-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 12px;
        .tab-bar-nav-icon {
          font-size: 20px;
        }
      }
      .router-link-exact-active {
        color: green;
      }
    }
  }
}
</style>