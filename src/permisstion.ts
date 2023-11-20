// import { nprogress } from '@/nprogress';
//路由鉴权：项目当中路由能不能被访问的权限设置(某一个路由什么条件下能被访问，什么条件下不能被访问)
import router from '@/router';
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//全局守卫：项目当中任意路由的切换都会触发的钩子
//全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
	//to:你将要访问哪个路由
	//from：你从哪个路由来
	//next：路由放行函数
	//访问某一个路由之前守卫
	nprogress.start();
	next();
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
	nprogress.done();
});

//1. 任意路由切换实现进度条业务  ---nprogress
