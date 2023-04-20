import { createRouter, createWebHistory } from "vue-router";
// import Home from './views/Home.vue'
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Foot from "./views/Foot.vue";
import DocOrder from "./views/DocOrder/DocOrder.vue";
import Center from "./views/Center/Center.vue";
import Storage from '@/utils/cache'
import { ElMessageBox } from "element-plus";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import hosIntroduce from '@/views/hosIntroduce/index.vue'
import keshiIntroduce from '@/views/hosIntroduce/keshiIntroduce.vue'
import docIntroduce from '@/views/hosIntroduce/docIntroduce.vue'
import envIntroduce from '@/views/hosIntroduce/envIntroduce.vue'
import petSpace from '@/views/PetSpace/index.vue'
import yishengOrder from '@/views/DocOrder/yishengOrder.vue'
import docCenter from '@/views/docCenter/docCenter.vue'
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/foot",
      name: "foot",
      component: Foot,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/DocOrder",
      // name: 'DocOrder',
      component: DocOrder,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/yishengOrder",
      // name: 'DocOrder',
      component: yishengOrder,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/hosIntroduce",
      // name: 'DocOrder',
      component: hosIntroduce,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/keshiIntroduce",
      // name: 'DocOrder',
      component: keshiIntroduce,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/docIntroduce",
      // name: 'DocOrder',
      component: docIntroduce,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/envIntroduce",
      // name: 'DocOrder',
      component: envIntroduce,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/petSpace",
      // name: 'DocOrder',
      component: petSpace,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/Center",
      // name:'Center',
      component: Center,
      meta: { redirectAlreadyLogin: true },
      redirect:"Center/myPet",
      children: [
        {
          path: "myPet",
          name: "myPet",
          component: () => import("./views/Center/myPet.vue"),
        },
        {
          path: "myOrder",
          name: "myOrder",
          component: () => import("./views/Center/myOrder.vue"),
        },
        {
          path: "myInform",
          name: "myInform",
          component: () => import("./views/Center/myInform.vue"),
        }
      ],
    },
    {
      path: "/docCenter",
      // name:'Center',
      component: docCenter,
      meta: { redirectAlreadyLogin: true },
      redirect:"docCenter/myWorkTime",
      children: [
        {
          path: "myWorkTime",
          name: "myWorkTime",
          component: () => import("./views/docCenter/myWorkTime.vue"),
        },
        {
          path: "qjAnddk",
          name: "myInform",
          component: () => import("./views/docCenter/qjAnddk.vue"),
        },
        {
          path: "docInform",
          name: "docInform",
          component: () => import("./views/docCenter/docInform.vue"),
        },
      ],
    },
  ],
});
// 前置守卫判断用户是否登录
router.beforeEach((to,from,next)=>{
  NProgress.start()
  if(to.path == "/"){
    if(Storage.getCache("userId")||Storage.getCache("docId")){
      ElMessageBox.alert("您已登录", "错误", {
        confirmButtonText: "确定",
        type: "error",
      }).then(() => {
        // console.log("重新登录");
        //next(`/procmgr/login?redirect=${to.path}`);
        console.log(from)
        next("/home");
      });
    }else{
      next()
    }

  }else{
    // console.log(Storage.getCache("userId"))
    if(Storage.getCache("userId")||Storage.getCache("docId")){
      next()
    }else{
      ElMessageBox.alert("用户未登录,需要重新登录.", "错误", {
        confirmButtonText: "确定",
        type: "error",
      }).then(() => {
        // console.log("重新登录");
        //next(`/procmgr/login?redirect=${to.path}`);
        next("/");
        // NProgress.done();
      });
    }
  }
})
// 后置守卫
router.afterEach((to) => {
+  NProgress.done()
})
export default router;
