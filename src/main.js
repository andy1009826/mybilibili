import Vue from "vue";
import App from "./App.vue";
import "./assets/style/fonts/icomoon.eot";
import "./assets/style/fonts/icomoon.svg";
import "./assets/style/fonts/icomoon.ttf";
import "./assets/style/fonts/icomoon.woff";
import "./assets/style/fonts/style.css";

Vue.config.productionTip = false;
// 导入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 导入路由
import VueRouter from "vue-router";

// use一下
Vue.use(VueRouter);

// /导入需要路由管理的组件
import discovery from "./views/discovery.vue";
import songlist from "./views/songlist.vue";
import music from "./views/music.vue";
import mvs from "./views/mvs.vue";
import searchresult from "./views/searchresult.vue";
import playlist from "./views/playlist.vue";
import playmvs from "./views/playmvs.vue";

// 创建路由
let router = new VueRouter({
  routes: [
    {
      // 发现音乐
      // 地址
      path: "/discovery",
      // 组件
      component: discovery,
    },
    {
      // 地址
      path: "/",
      // 组件
      component: discovery,
    },
    {
      // 推荐歌单
      // 地址
      path: "/songlist",
      // 组件
      component: songlist,
    },
    {
      // 最新音乐
      // 地址
      path: "/music",
      // 组件
      component: music,
    },
    {
      // 最新MV
      // 地址
      path: "/mvs",
      // 组件
      component: mvs,
    },
    {
      // 地址
      path: "/searchresult",
      // 组件
      component: searchresult,
    },
    {
      //歌单详情页
      path: "/playlist",
      // 组件
      component: playlist,
    },
    {
      //mv详情页
      path: "/playmvs",
      // 组件
      component: playmvs,
    },
  ],
});

new Vue({
  render: (h) => h(App),
  // 挂载到实例上
  router, // router: router,
}).$mount("#app");
