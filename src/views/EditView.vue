<script setup lang="ts">
import IntegerView from '@/components/tree/IntegerView.vue';
import ListViewVue from '@/components/tree/ListView.vue';
import StringView from '@/components/tree/StringView.vue';

const data = new Uint8Array([72, 101, 108, 108, 111]) // Hello

</script>

<template>
    <el-container class="is-vertical">
        <StringView :data="data" />
        <IntegerView :data="100" />
        <ListViewVue :data="[1, 2, 3, 'abc']" />
    </el-container>
</template>
