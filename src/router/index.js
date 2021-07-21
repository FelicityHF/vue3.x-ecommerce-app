import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home/Home.vue"),
    meta: {
      title: 'EWShop 首页'
    }
  },
  {
    // path: "/detail/:id",//动态路由
    path: '/detail',//不使用动态路由，使用query
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Detail/Detail.vue"),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: "/category",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Category/Category.vue"),
    meta: {
      title: '商品分类'
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart/Cart.vue"),
    meta: {
      title: '购物车'
    },
    //进入路由之前
    beforeEnter(to, from, next) {
      const isLogin = localStorage.isLogin;
      if (!isLogin) {
        next({ name: 'Login' })
      } else {
        next()
      }
    },
  },
  {
    path: "/bill",
    name: "ConfrimOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Bill/ConfirmOrder.vue"),
    meta: {
      title: '订单结算'
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Profile/Profile.vue"
      ),
    meta: {
      title: '用户中心'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile/Login.vue"),
    meta: {
      title: '登录'
    },
    beforeEnter(to, from, next) {
      const isLogin = localStorage.isLogin;
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile/Register.vue"),
    meta: {
      title: '注册'
    }
  },
  {
    path: "/address",
    name: "Address",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Profile/Address.vue"
      ),
    meta: {
      title: '地址管理'
    }
  },
  {
    path: "/addaddress",
    name: "AddAddress",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Profile/AddAddress.vue"
      ),
    meta: {
      title: '新增地址'
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 全局导航守卫
router.beforeEach((to) => {
  document.title = to.meta.title;
  // const { isLogin } = localStorage;
  // if (!isLogin && (to.name !== 'Login') && (to.name !== 'Register')) {
  //   next({ name: 'Login' });
  // } else {
  //   next()
  // }
})


export default router;
