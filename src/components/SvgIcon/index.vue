<template>
    <div>
        <!-- 测试SVG图标使用 -->
        <svg :style="{ width, height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
    //xlink:href属性值前缀
    prefix: {
        type: String,
        default: "#icon-"
    },
    //提供使用的图标名字
    name: String,
    //接受父组件传递的颜色
    color: {
        type: String,
        default: ''
    },
    //接受父组件传递过来的图标宽度
    width: {
        type: String,
        default: '16px'
    },
    //接受父组件传递过来的图标高度
    height: {
        type: String,
        default: '16px'
    }

})

</script>

<style scoped></style>