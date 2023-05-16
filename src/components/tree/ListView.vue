<script setup lang="ts">
import type { BDict, BInt, BList, BString, BValue } from '@/bencode';
import { ref } from 'vue';
import DictView from './DictView.vue';
import IntegerView from './IntegerView.vue';
import StringView from './StringView.vue';

const props = defineProps<{
    data: BList,
    name: string
}>()
const emits = defineEmits<{
    (event: 'update', value: BList): void
}>()

const list = ref(props.data)
const update = (idx: number, val: BValue) => {
    list.value.value[idx] = val
    emits('update', list.value)
}

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
                <StringView :data="(value as BString)" @update="(val: BString) => update(idx, val)" :name="`#${idx}`"
                    v-if="(value.Type() === 'string')" />
                <IntegerView :data="(value as BInt)" @update="(val: BInt) => update(idx, val)" :name="`#${idx}`"
                    v-if="(value.Type() === 'integer')" />
                <ListView :data="(value as BList)" @update="(val: BList) => update(idx, val)" :name="`#${idx}`"
                    v-if="(value.Type() === 'list')" />
                <DictView :data="(value as BDict)" @update="(val: BDict) => update(idx, val)" :name="`#${idx}`"
                    v-if="(value.Type() === 'dict')" />
            </li>
        </ul>
    </details>
</template>
