<template>
  <head-nav-bar>
    <template v-slot:left>&#xe676;</template>
    <template v-slot:default>注册</template>
    <!-- <template v-slot:right></template> -->
  </head-nav-bar>

  <div class="register-content">
    <img src="@/assets/images/user.png" alt="" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '再次确认密码' }]"
        />
        <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          style="font-size: 16px"
          round
          block
          type="primary"
          native-type="submit"
        >
          注册
        </van-button>
      </div>
    </van-form>
    <router-link to="/login">去登录</router-link>
  </div>
</template>
<script>
import headNavBar from "@/components/headNavBar.vue";
import { ref, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/network/user.js";
import { Toast } from "vant";
export default {
  name: "Register",
  components: { headNavBar },
  setup() {
    const accounts = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const router = useRouter();
    const onSubmit = () => {
      //   console.log("submit", values);
      //先验证
      if (accounts.password === accounts.password_confirmation) {
        console.log("密码相同，提交数据");
        register(accounts).then((res) => {
          console.log(res);
          if (res.status === 201) {
            Toast.success("注册成功");
            //注册成功后延时跳转至登录页面
            setTimeout(() => {
              router.push({ path: "/login" });
            }, 1000);
            //清空密码数据
            accounts.password = "";
            accounts.password_confirmation = "";
          }
        });
      } else {
        Toast("密码输入不一致");
      }

      //提交到服务器
    };

    return {
      ...toRefs(accounts),
      onSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.register-content {
  margin-top: 84px;
  text-align: center;
  font-size: 14px;
  img {
    width: 100px;
    margin-bottom: 40px;
  }
}
</style>