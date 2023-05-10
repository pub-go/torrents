<template>
    <details class="mt4 pl pt pb b b-solid">
        <summary class="cursor-pointer">
            <el-row class="inline-flex w95%">
                <el-col :span="12">{{ props.name }}</el-col>
                <el-col :span="12">{{ __('Dict') }}</el-col>
            </el-row>
        </summary>
        <ul class="pl0">
            <li v-for="(value, key) in dict.value" class="list-none">
                <StringView :data="(value as BString).value" :name="key" v-if="(value.Type() === 'string')" />
                <IntegerView :data="(value as BInt).value" :name="key" v-if="(value.Type() === 'integer')" />
                <ListView :data="(value as BList)" :name="key" v-if="(value.Type() === 'list')" />
                <DictView :data="(value as BDict)" :name="key" v-if="(value.Type() === 'dict')" />
            </li>
        </ul>
    </details>
</template>

<script setup lang="ts">
import type { BDict, BInt, BList, BString } from '@/bencode';
import { ref } from 'vue';
import IntegerView from './IntegerView.vue';
import ListView from './ListView.vue';
import StringView from './StringView.vue';

const props = defineProps<{
    data: BDict,
    name: string,
}>()

const dict = ref(props.data)

</script>