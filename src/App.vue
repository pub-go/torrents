<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue';
import { elLocale } from './i18n/gettext';

</script>

<template>
  <el-config-provider :locale="elLocale">
    <el-container>
      <el-header>
        <PageHeader />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer style="min-height: var(--el-footer-height);height: auto;">
        <PageFooter />
      </el-footer>
    </el-container>
  </el-config-provider>
</template>
<style></style>