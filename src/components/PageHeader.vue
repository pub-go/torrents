<script setup lang="ts">
import { useGettext } from "vue3-gettext";
import { toggleDark } from "../composables/dark";
import { changeLang } from '../i18n/gettext';

const gettext = useGettext()
async function onSelectMenu(key: string, path: string[]) {
    if (path && path.length > 0 && path[0] === 'lang') {
        changeLang(key)
    }
}
</script>
<template>
    <el-menu mode="horizontal" :default-active="$route.name" @select="onSelectMenu">
        <el-menu-item index="home">
            <RouterLink class="block" to="/">{{ __('Home') }}</RouterLink>
        </el-menu-item>
        <el-menu-item index="create">
            <RouterLink class="block" to="/create">{{ __('Create') }}</RouterLink>
        </el-menu-item>
        <el-menu-item index="view">
            <RouterLink class="block" to="/view">{{ __('View') }}</RouterLink>
        </el-menu-item>

        <div class="grow"></div>

        <el-sub-menu index="lang">
            <template #title>
                <i inline-flex i="ph-translate" />
            </template>
            <template v-for="(name, lang) in gettext.available" :key="lang">
                <el-menu-item :index="lang">{{ name }}</el-menu-item>
            </template>
        </el-sub-menu>
        <el-menu-item h="full" @click="toggleDark()">
            <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
                <i inline-flex i="dark:ep-moon ep-sunny" />
            </button>
        </el-menu-item>
        <el-menu-item index="about" class="justify-center">
            <RouterLink class="block" to="/about">{{ __('About') }}</RouterLink>
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
