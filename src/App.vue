<script setup lang="ts">
// zhCN 需要配合 types.d.ts 才能识别为模块
import zhCN from 'element-plus/dist/locale/zh-cn.mjs';
import { RouterView } from 'vue-router';
</script>

<template>
  <el-config-provider :locale="zhCN">
    <RouterView />
  </el-config-provider>
</template>
