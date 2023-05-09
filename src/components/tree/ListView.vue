<script setup lang="ts">
import { ref } from 'vue';
import IntegerView from './IntegerView.vue';

const props = defineProps<{
    data: Array<any>,
}>()

const value = ref(props.data)

</script>
<template>
    <details>
        <summary class="cursor-pointer">
            <el-row class="inline-flex w95%">
                <el-col :span="4">{{ __('#') }}</el-col>
                <el-col :span="4">{{ __('Type') }}</el-col>
                <el-col :span="16">{{ __('Value') }}</el-col>
            </el-row>
        </summary>
        <ul class="pl0">
            <li v-for="(item, idx) of value" class="list-none">
                <el-row>
                    <el-col :span="4">{{ idx }}</el-col>
                    <el-col :span="4">
                        <el-text v-if="(typeof item === 'number')">{{ __('Integer') }}</el-text>
                    </el-col>
                    <el-col :span="16">
                        <IntegerView :data="item" v-if="(typeof item === 'number')" />
                    </el-col>
                </el-row>
            </li>
        </ul>
    </details>
</template>
