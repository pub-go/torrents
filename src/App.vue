<script setup lang="ts">
// zhCN 需要配合 types.d.ts 才能识别为模块
import zhCN from 'element-plus/dist/locale/zh-cn.mjs';
import { RouterView } from 'vue-router';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <el-config-provider :locale="zhCN">
    <el-container>
      <el-header>
        <PageHeader />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>
        <PageFooter />
      </el-footer>
    </el-container>
  </el-config-provider>
</template>
<style></style>