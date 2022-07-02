import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    redirect: "goods",
    children: [
      {
        path: "goods",
        name: "GoodsView",
        meta: {
          isShow: true,
          title: "商品列表",
        },
        component: () => import("../views/GoodsView.vue"),
      },
      {
        path: "user",
        name: "UserView",
        meta: {
          isShow: true,
          title: "用户列表",
        },
        component: () => import("../views/UserView.vue"),
      },
      {
        path: "role",
        name: "roleView",
        meta: {
          isShow: true,
          title: "角色列表",
        },
        component: () => import("../views/RoleView.vue"),
      },
      {
        path: "authority",
        name: "AuthorityView",
        meta: {
          isShow: false,
          title: "权限列表",
        },
        component: () => import("../views/AuthorityView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token: string | null = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
