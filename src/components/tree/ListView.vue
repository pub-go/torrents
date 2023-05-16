<script setup lang="ts">
import { BDict, BInt, BList, BString, type BValue } from '@/bencode';
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

const addIndex = ref(list.value.value.length)
const addType = ref('string')
const add = () => {
    const index = addIndex.value
    addIndex.value++
    switch (addType.value) {
        case 'string':
            return update(index, new BString(''))
        case 'integer':
            return update(index, new BInt(0))
        case 'list':
            return update(index, new BList([]))
        case 'dict':
            return update(index, new BDict({}))
    }

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
            <li class="list-none mt4 pl pt pb b b-dashed">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="addIndex" :placeholder="_x('add key to List', 'Index')" required type="number" />
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
