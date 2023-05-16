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
                <StringView :data="(value as BString)" @update="(val: BString) => update(key, val)" :name="key"
                    v-if="(value.Type() === 'string')" />
                <IntegerView :data="(value as BInt)" @update="(val: BInt) => update(key, val)" :name="key"
                    v-if="(value.Type() === 'integer')" />
                <ListView :data="(value as BList)" @update="(val: BList) => update(key, val)" :name="key"
                    v-if="(value.Type() === 'list')" />
                <DictView :data="(value as BDict)" @update="(val: BDict) => update(key, val)" :name="key"
                    v-if="(value.Type() === 'dict')" />
            </li>
            <li class="list-none mt4 pl pt pb b b-dashed">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="addKey" :placeholder="_x('add key to Dict', 'Key')" required />
                    </el-col>
                    <el-col :span="8" class="flex">
                        <el-select v-model="addType" :placeholder="_x('add key to Dict/List', 'Type')" class="ma">
                            <el-option :value="'string'" :label="__('String')" />
                            <el-option :value="'integer'" :label="__('Integer')" />
                            <el-option :value="'list'" :label="__('List')" />
                            <el-option :value="'dict'" :label="__('Dict')" />
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-button @click="add">{{ _x('add key to Dict/List', 'Add') }}</el-button>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </details>
</template>

<script setup lang="ts">
import { BDict, BInt, BList, BString, type BValue } from '@/bencode';
import { ref } from 'vue';
import IntegerView from './IntegerView.vue';
import ListView from './ListView.vue';
import StringView from './StringView.vue';

const props = defineProps<{
    data: BDict,
    name: string,
}>()
const emits = defineEmits<{
    (event: 'update', value: BDict): void
}>()

const dict = ref(props.data)
const update = (key: string, val: BValue) => {
    dict.value.value[key] = val
    emits('update', dict.value)
}

const addKey = ref('')
const addType = ref('string')
const add = () => {
    const key = addKey.value
    if (key !== '') {
        switch (addType.value) {
            case 'string':
                return update(key, new BString(''))
            case 'integer':
                return update(key, new BInt(0))
            case 'list':
                return update(key, new BList([]))
            case 'dict':
                return update(key, new BDict({}))
        }
    }
}
</script>
<style scoped>
li:hover {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-color: var(--el-color-success);
}
</style>
