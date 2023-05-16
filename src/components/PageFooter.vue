<script setup lang="ts">
const gitInfo = __GIT_INFO__
const date = new Date(Number(gitInfo.timestampt) * 1000)
import {format} from '@/util/format'

</script>
<template>
    <el-row class="justify-between">
        <span>&copy; 2023</span>
        <span>
            <a href="https://github.com/pub-go/torrents" target="_blank">GitHub</a>
            {{ format(
                __('last update at: {0}-{1}-{2} (version: {3})'),
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                gitInfo.commit,
            ) }}
        </span>
    </el-row>
</template>
