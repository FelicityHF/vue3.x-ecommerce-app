<template>
  <div class="tab-bar-nav">
    <ul class="tab-bar-nav-ul">
      <div class="child" />
      <li class="tab-bar-nav-ul-li">
        <router-link class="nav-link" to="/">
          <div class="iconfont tab-bar-nav-icon">&#xe674;</div>
          首页
        </router-link>
      </li>
      <li class="tab-bar-nav-ul-li">
        <router-link class="nav-link" to="/category">
          <div class="iconfont tab-bar-nav-icon">&#xe675;</div>
          分类
        </router-link>
      </li>
      <li class="tab-bar-nav-ul-li">
        <router-link class="nav-link" to="/cart">
          <van-badge :content="$store.state.cartCount" max="99">
            <div class="iconfont tab-bar-nav-icon">&#xe992;</div>
            购物车
          </van-badge>
        </router-link>
      </li>
      <li class="tab-bar-nav-ul-li">
        <router-link class="nav-link" to="/profile">
          <div class="iconfont tab-bar-nav-icon">&#xe99e;</div>
          我的
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tabBarNav",
  setup() {},
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