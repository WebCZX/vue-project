<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加按钮 -->
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!-- 表格组件：用于展示已有的平台数据 -->
        <!-- 
            table
            ---border：设置表盒纵向是否有边框
            tanle-column
            ---label：某一个列表
            ---width：设置这列宽度
            ---align：设置这一列对齐方式
         -->
        <el-table style="margin:10px 0 ;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <!-- table-column:默认展示数据用div -->
            <el-table-column label="品牌名称">
                <template #="{ row, $index }">
                    <pre style="color: brown;">{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" alt="暂无图片" style=" width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row, $index }">
                    <el-button type="success" size="small" icon="Edit"></el-button>
                    <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器组件
            pagination
                v-model:current-page:设置分页器当前页码
                v-model:page-size:设置每一个展示数据条数
                page-sizes:用于设置下拉菜单数据
                background:设置分页器按钮背景颜色
                laout:设置分页器六个子组件布局调整
        -->
        <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" paper-count="9"
            v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev,pager,next,jumper,->,sizes,total" :total="400" />
    </el-card>
</template>

<script setup lang="ts">

//引入组合式API函数ref
import { ref, onMounted } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type';
//当前页码
let pageNo = ref<number>(1);
//定义每一页展示多少条数据
let limit = ref<number>(3);
//存储已有品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<Records>([]);
//获取已有品牌的接口封装为一个函数：在任何环境下向获取数据，调用函数即可
const getHasTrademark = async (pager = 1) => {
    //当前页码
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        //存储已有品牌总个数
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
}
//组件挂载完毕钩子---发一次请求，获取第一页、一页三个已有品牌数据
onMounted(() => {
    getHasTrademark()
})
//分页器当前页码发生变化时触发
//对于当前页码发生变化自定义事件，组件pagination父组件回传了数据
// const changePageNo = () => {
//     //当前页码发生变化时再次发请求获取对应已有品牌数据（当前页码）
//     getHasTrademark();
// }

//当下拉菜单发生变化时触发此方法
//这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页数据量发生变化时，当前页码归1
    pageNo.value = 1;
    getHasTrademark();
}

</script>

<style scoped></style>