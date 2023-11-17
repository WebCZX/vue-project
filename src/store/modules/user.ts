// import { ElMessage } from 'element-plus';
//创建用户相关的小仓库
import { defineStore } from 'pinia';
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user';
//引入数据类型
import type { loginFrom, loginResponseData } from '@/api/user/type';
import type { UserState } from './types/type';
//引入本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';
//引入路由（常量路由）
import { constantRoute } from '@/router/routes';
//创建用户小仓库
let useUserStore = defineStore('User', {
	//小仓库存储数据的地方
	state: (): UserState => {
		return {
			token: GET_TOKEN(), //用户唯一标识token
			menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
			username: '',
			avatar: '',
		};
	},
	//异步|逻辑的地方
	actions: {
		//用户登录的方法
		async userLogin(data: loginFrom) {
			//登录请求
			let result: loginResponseData = await reqLogin(data);
			//登陆请求：成功200->token
			//登录请求：失败201->登陆失败错误的信息
			if (result.code === 200) {
				//pinia仓库存储token
				//由于pinia|vuex存储数据其实利用js对象
				this.token = result.data.token as string;
				//本地存储持久化存储一份
				SET_TOKEN(result.data.token as string);
				return 'ok';
			} else {
				return Promise.reject(new Error(result.data.message));
			}
		},
		//获取用户信息方法
		async userInfo() {
			//获取用户信息进行存储仓库当中[用户头像、名字]
			let result = await reqUserInfo();
			//如果获取用户信息成功，存储用户信息
			if (result.code == 200) {
				this.username = result.data.checkUser.username;
				this.avatar = result.data.checkUser.avatar;
			} else {
			}
		},
	},
	getters: {},
});
//对外暴露获取小仓库的方法
export default useUserStore;
