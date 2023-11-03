<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">左侧菜单</div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">顶部导航</div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <p style="height: 1000px;">我是段落</p>
            内容展示区域
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background-color;
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-table-height;
        background-color: blue;
        top: 0;
        left: $base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-table-height);
        background-color: yellowgreen;
        left: $base-menu-width;
        top: $base-table-height;
        padding: 20px;
        overflow: auto;
    }

}
</style>