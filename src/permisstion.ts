// import { nprogress } from '@/nprogress';
//路由鉴权：项目当中路由能不能被访问的权限设置(某一个路由什么条件下能被访问，什么条件下不能被访问)
import router from "@/router";
import setting from "./setting";
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });
//获取用户相关的小仓库内部token数据，判断用户是否登陆成功
import useUserStore from "./store/modules/user";
import pinia from "./store";
let userStore = useUserStore(pinia);
console.log(userStore);

//全局守卫：项目当中任意路由的切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  //to:你将要访问哪个路由
  //from：你从哪个路由来
  //next：路由放行函数
  //访问某一个路由之前守卫
  nprogress.start();
  //获取token，判断用户有没有登录
  let token = userStore.token;
  //获取用户名字
  let username = userStore.username;
  //用户登陆判断
  if (token) {
    //登陆成功，访问login。不能访问。指向首页
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登陆成功访问其余6个路由(登录排除)
      //有用户信息
      if (username) {
        next();
      } else {
        //如果没有用户信息，在守卫这里发送请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo();
          //放行
        } catch (error) {
          //token过期
          //用户手动修改本地存储token
          //退出登录->用户相关数据清空
          userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
  next();
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});

//1. 任意路由切换实现进度条业务  ---nprogress
//2.路由鉴权(路由组件访问权限的设置)
//全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录可以访问login，其余6个路由不能访问(指向login)
//用户登录成功：不可以访问login[指向首页]，其余路由可以访问
