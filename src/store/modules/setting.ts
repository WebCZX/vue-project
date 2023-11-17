//小仓库：关于layout组件相关配置仓库
import { defineStore } from 'pinia';

let useLayOutSettingStore = defineStore('useLayOutSettingStore', {
	state: () => {
		return {
			fold: false, //用于控制菜单折叠还是收起控制
			refsh:false,//仓库这个属性用于刷新效果
		};
	},
});

export default useLayOutSettingStore;
