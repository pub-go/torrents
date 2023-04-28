<script setup lang="ts">

</script>
<template>
    <el-menu mode="horizontal" :ellipsis="false" :default-active="$route.name">
        <el-menu-item index="home">
            <RouterLink class="block" to="/">Torrents</RouterLink>
        </el-menu-item>
        <el-menu-item index="create">
            <RouterLink class="block" to="/">Create</RouterLink>
        </el-menu-item>
        <el-menu-item index="view">
            <RouterLink class="block" to="/view">View</RouterLink>
        </el-menu-item>
        <el-menu-item index="about">
            <RouterLink class="block" to="/about">About</RouterLink>
        </el-menu-item>
    </el-menu>
</template>

<style>
.el-menu-item {
    padding: 0;
}

.el-menu-item>* {
    padding: 0 20px;
}
</style>
