<script setup lang="ts">
import type { BDict, BInt, BList, BString } from '@/bencode';
import { ref } from 'vue';
import DictView from './DictView.vue';
import IntegerView from './IntegerView.vue';

const props = defineProps<{
    data: BList,
    name: string
}>()

const list = ref(props.data)

</script>

<template>
    <details class="mt4 pl pt pb b b-solid">
        <summary class="cursor-pointer">
            <el-row class="inline-flex w95%">
                <el-col :span="12">{{ props.name }}</el-col>
                <el-col :span="12">{{ __('List') }}</el-col>
            </el-row>
        </summary>
        <ul class="pl0">
            <li v-for="(value, idx) of list.value" class="list-none">
                <StringView :data="(value as BString).value" :name="`#${idx}`" v-if="(value.Type() === 'string')" />
                <IntegerView :data="(value as BInt).value" :name="`#${idx}`" v-if="(value.Type() === 'integer')" />
                <ListView :data="(value as BList)" :name="`#${idx}`" v-if="(value.Type() === 'list')" />
                <DictView :data="(value as BDict)" :name="`#${idx}`" v-if="(value.Type() === 'dict')" />
            </li>
        </ul>
    </details>
</template>
