<template>
  <head-nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>个人中心</template>
    <template v-slot:right>&#xe679;</template>
  </head-nav-bar>

  <div class="profile-content">
    <div class="user-info">
      <div class="avator-wrapper">
        <img class="user-avator" src="../../assets/images/鲜花@2x.png" alt="" />
      </div>
      <div class="personal">
        <router-link
          class="current-user-name loginBtn"
          to="/login"
          v-show="!isLogin"
          >登录</router-link
        >
        <div class="current-user-name" v-show="isLogin">
          {{ user.name }}
        </div>
        <span class="personal-intro" v-show="isLogin">个人简介 .....</span>
      </div>
    </div>
    <ul class="usercenter-menu-list">
      <li class="usercenter-menu" v-for="item in menuLists" :key="item.text">
        <router-link :to="item.path" href="">
          <div class="usercenter-menu-left">
            <span
              class="iconfont usercenter-menu-icon"
              :style="item.backgroundColor"
              v-html="item.menuicon"
            ></span>
            {{ item.text }}
          </div>
          <span class="iconfont next-arrow">&#xe62f;</span>
        </router-link>
      </li>
    </ul>

    <van-button
      plain
      type="primary"
      class="user-logout"
      @click="clickToLogout"
      v-show="isLogin"
      style="width: 100%; height: 34px; border-color: green; color: green"
    >
      退出登录
    </van-button>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import HeadNavBar from "../../components/headNavBar.vue";
import { logout, getUser } from "@/network/user.js";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
import { toRefs, onMounted, reactive } from "vue";
export default {
  name: "Profile",
  components: { headNavBar },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { isLogin } = toRefs(store.state);

    const state = reactive({
      user: {},
    });

    //获取用户信息
    onMounted(() => {
      getUser().then((res) => {
        console.log("getuser", res);
        state.user = res;
      });
    });

    // const currentUser = toRefs(store.state);
    const clickToLogout = () => {
      logout().then((res) => {
        console.log("logout", res);
        if (res.status === 204) {
          Toast("已退出账号");
          // localStorage.removeItem("token");
          //清除localStorage里的token，直接删除和改成空的效果是一样的把？
          localStorage.setItem("token", "");
          localStorage.setItem("isLogin", "");
          //同步状态到vuex
          store.commit("userState", "");

          //跳转
          setTimeout(() => {
            router.push({ path: "/profile" });
          }, 0);
        }
      });
    };

    //菜单项
    const menuLists = [
      {
        menuicon: "&#xe617;",
        text: "我的订单",
        backgroundColor: { background: "#ed4a47" },
        path: "/myorder",
      },
      {
        menuicon: "&#xe61f;",
        text: "我的收藏",
        backgroundColor: { background: "#32c5ff" },
        path: "/address",
      },
      {
        menuicon: "&#xe635;",
        text: "账号管理",
        backgroundColor: { background: "#9013fe" },
        path: "/address",
      },
      {
        menuicon: "&#xe61f;",
        text: "地址管理",
        backgroundColor: { background: "#9013fe" },
        path: "/address",
      },
      {
        menuicon: "&#xe635;",
        text: "客服与帮助",
        backgroundColor: { background: "#9013fe" },
        path: "/address",
      },
    ];
    return { clickToLogout, isLogin, menuLists, ...toRefs(state) };
  },
};
HeadNavBar;
</script>
<style lang="scss" scoped>
.profile-content {
  padding: 0 18px;

  .user-info {
    margin-top: 54px;
    padding: 10px 14px;
    background-color: rgb(231, 235, 231);
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 1px 2px 6px rgba($color: #000, $alpha: 0.2);

    .avator-wrapper {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      .user-avator {
        width: 100%;
      }
    }
    .personal {
      .current-user-name {
        margin-bottom: 6px;
        display: block;
      }
      .loginBtn {
        border: 1px solid green;
        text-align: center;
        padding: 4px 15px;
        color: green;
        border-radius: 5px;
      }
      .personal-intro {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .usercenter-menu-list {
    background: #fff;
    border-radius: 4px;
    box-shadow: 1px 2px 6px rgba($color: #000000, $alpha: 0.12);
    margin: 20px 0;
    .usercenter-menu {
      height: 54px;
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // width: 100%;
        height: 100%;
        padding: 0 16px;
        font-size: 14px;
        .usercenter-menu-icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          border-radius: 40%;
          color: white;
          text-align: center;
          line-height: 22px;
          margin-right: 6px;
          font-size: 10px;
        }
        .next-arrow {
          color: #c2c4ca;
        }
      }
    }
  }
}
</style>