<script setup lang="ts">
import { toggleDark } from "../composables/dark";
</script>
<template>
    <el-menu mode="horizontal" :ellipsis="false" :default-active="$route.name">
        <el-menu-item index="home">
            <RouterLink class="block" to="/">Torrents</RouterLink>
        </el-menu-item>
        <el-menu-item index="create">
            <RouterLink class="block" to="/create">Create</RouterLink>
        </el-menu-item>
        <el-menu-item index="view">
            <RouterLink class="block" to="/view">View</RouterLink>
        </el-menu-item>
        <el-menu-item index="about">
            <RouterLink class="block" to="/about">About</RouterLink>
        </el-menu-item>
        <el-menu-item h="full" @click="toggleDark()">
            <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
                <i inline-flex i="dark:ep-moon ep-sunny" />
            </button>
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
