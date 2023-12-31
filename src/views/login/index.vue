<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录的表单 -->
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>你好！</h1>
                    <h2>欢迎来到我的商城</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user';//引入用户相关的小仓库
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
//获取路由器
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//定义变量控制按钮加载效果
let loading = ref(false)
let useStore = useUserStore();
//获取el-form组件
let loginForms = ref();
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123', })
//登录按钮回调
const login = async () => {
    //保证全部表单相校验通过再发请求
    await loginForms.value.validate();

    //加载效果：开始加载
    loading.value = true
    //点击登录按钮后干什么？
    //通知仓库发登录请求
    //请求成功->首页展示数据的地方
    //请求失败->弹出登陆失败信息
    try {
        //保证登录成功
        await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        //判断登录时，路由路径是否有query参数，如果有，就往query参数跳转，没有则跳转到首页
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || '/' });
        //登陆成功提示信息
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi,${getTime()}好`
        });
        //登陆成功加载效果也消失
        loading.value = false;
    } catch (error) {
        //登录失败加载效果消息
        loading.value = false;
        //登陆失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

//自定义校验规则函数
const valifatorUserName = (_rule: any, value: any, callback: any) => {
    //rule：校验规则对象
    //value：表单元素文本内容
    //函数：如果符合条件callback放行通过即为
    //如果不符合条件callback方法，注入错误提示信息
    if (value.length < 5) {
        callback(new Error('账号长度至少5位'));
    } else if (value.length > 10) {
        callback(new Error('账号长度最多10位'));
    } else {
        callback();
    }
}
const valifatorPassword = (_rule: any, value: any, callback: any) => {
    //rule：校验规则对象,没有引用时前面加“_”可省略报错信息
    //value：表单元素文本内容
    //函数：如果符合条件callback放行通过即为
    //如果不符合条件callback方法，注入错误提示信息
    if (value.length < 6) {
        callback(new Error('密码长度至少6位'));
    } else if (value.length > 10) {
        callback(new Error('密码长度最多10位'));
    } else {
        callback();
    }
}

//定义表单校验需要配置对象
const rules = {
    // 规则对象属性
    // required：代表这个字段务必要校验
    // min：文本长度至少多少位
    // max：文本长度最多多少位
    // message：错误的提示信息
    // trigger：触发校验表单的时机 change->文本发生变化出发校验，blur->失去焦点时触发校验
    username: [
        // { required: true, min: 6, message: '账号长度至少6位', trigger: 'change' },
        // { required: true, max: 10, message: '账号长度最多10位', trigger: 'change' }
        { trigger: 'change', validator: valifatorUserName }
    ],
    password: [
        // { required: true, min: 6, message: '密码长度至少6位', trigger: 'change' },
        // { required: true, max: 10, message: '账密码长度最多10位', trigger: 'change' }
        { trigger: 'change', validator: valifatorPassword }
    ],
}
</script>

<style scoped lang="scss">
.login_container {
    widows: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0;
    }
}

.login_btn {
    width: 100%;
}
</style>