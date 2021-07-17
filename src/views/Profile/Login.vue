<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>登录</template>
    <!-- <template v-slot:right></template> -->
  </head-nav-bar>
  <div class="login-content">
    <img src="@/assets/images/user.png" alt="" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          style="font-size: 16px"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <router-link to="/register">去注册</router-link>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { ref, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/network/user.js";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  name: "Login",
  components: { headNavBar },
  setup() {
    const userAccounts = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const store = useStore();
    const onSubmit = (values) => {
      console.log("submit", values);
      login(userAccounts).then((res) => {
        console.log("loginRes", res);
        //怎么判断登录成功？
        if (res != undefined) {
          //处理Token，登录成功服务器会返回一个随机Token，要获取过来存储在本地 localStorage
          const access_token = res.access_token;
          localStorage.setItem("token", access_token);

          //把登录状态保存到 vuex中
          // store.commit("userState", userAccounts.email);
          store.commit("userState", userAccounts.email);

          Toast.success("登录成功");
          //清空数据
          userAccounts.email = "";
          userAccounts.password = "";
          setTimeout(() => {
            router.go(-1);
          }, 0);
        }
      });
    };

    return {
      ...toRefs(userAccounts),
      onSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-content {
  margin-top: 84px;
  text-align: center;
  font-size: 14px;
  img {
    width: 100px;
    margin-bottom: 40px;
  }
}
</style>