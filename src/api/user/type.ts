//登录接口需要携带的参数ts类型
export interface loginFrom {
	username: string;
	password: string;
}

interface dataType {
	token: string;
}

//登录接口返回数据类型
export interface loginResponseData {
	code: number;
	data: dataType;
}

interface userInfo {
	userId: number;
	avatar: string;
	userName: string;
	password: string;
	desc: string;
	roles: string[];
	buttons: string[];
	routes: string[];
	token: string;
}
//定义服务器返回用户服务信息相关数据类型

interface user {
	checkUser: userInfo;
}

export interface userResponseData {
	code: number;
	data: user;
}