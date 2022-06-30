import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("/@/views/HomeView.vue"),
    children: [
      {
        path: "goods",
        name: "GoodsView",
        meta: {
          isShow: true,
          title: "商品列表",
        },
        component: () => import("/@/views/GoodsView.vue"),
      },
      {
        path: "user",
        name: "UserView",
        meta: {
          isShow: true,
          title: "用户列表",
        },
        component: () => import("/@/views/UserView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("/@/views/LoginView.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
