<template>
  <el-container class="is-vertical">
    <h3>{{ __('Reference Links') }}</h3>
    <ul>
      <el-divider />
      <li>
        <el-link type="primary" href="http://www.bittorrent.org/beps/bep_0003.html" target="_blank">
          {{ __('[Officical] The BitTorrent Protocol Specification (BEP_0003)') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://github.com/pub-go/bep/blob/main/bep_0003.md" target="_blank">
          {{ __('[Chinese] The BitTorrent Protocol Specification (BEP_0003)') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://github.com/Kimbatt/torrent-creator" target="_blank">
          {{ __('[GitHub] Kimbatt/torrent-creator') }}
        </el-link>
      </li>
      <el-divider />
      <li>
        <el-link type="primary" href="https://vitejs.dev/" target="_blank">
          {{ format(_x('reference link', '[Tooling] {0}'), 'https://vitejs.dev/') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://vuejs.org/" target="_blank">
          {{ format(_x('reference link', '[Framework] {0}'), 'https://vuejs.org/') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://router.vuejs.org/" target="_blank">
          {{ format(_x('reference link', '[Router] {0}'), 'https://router.vuejs.org/') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://element-plus.org/" target="_blank">
          {{ format(_x('reference link', '[UI] {0}'), 'https://element-plus.org/') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://unocss.dev/" target="_blank">
          {{ format(_x('reference link', '[Atomic CSS Engine] {0}'), 'https://unocss.dev/') }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" href="https://jshmrtn.github.io/vue3-gettext/" target="_blank">
          {{ format(_x('reference link', '[I18n] {0}'), 'https://jshmrtn.github.io/vue3-gettext/') }}
        </el-link>
      </li>
    </ul>
  </el-container>
</template>

<script setup lang="ts">
import { format } from '@/util/format';
</script>

<style scoped>
li {
  padding: .5rem;
}
</style>
