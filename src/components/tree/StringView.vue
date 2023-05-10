<template>
    <details class="mt4 pl pt pb b b-dashed">
        <summary class="cursor-pointer">
            <el-row class="inline-flex w95%">
                <el-col :span="12">{{ props.name }}</el-col>
                <el-col :span="12">{{ __('String') }}</el-col>
            </el-row>
        </summary>
        <el-row>
            <el-col :span="12" :xs="24">
                <el-input v-model="text" :type="multiLine ? 'textarea' : 'text'" :disabled="!canEdit" />
            </el-col>
            <el-col :span="4" :xs="8" class="flex justify-center">
                <el-checkbox v-model="hex">{{ __('Hex') }}</el-checkbox>
            </el-col>
            <el-col :span="4" :xs="8" class="flex justify-center">
                <el-checkbox v-model="multiLine">{{ __('Multi Line') }}</el-checkbox>
            </el-col>
            <el-col :span="4" :xs="8" class="flex justify-center">
                <el-button @click="onClick">{{ canEdit ? __('OK') : __('Edit') }}</el-button>
            </el-col>
        </el-row>
    </details>
</template>

<script setup lang="ts">

import { __ } from '@/i18n/gettext';
import { fromHex, fromString, toHex, toString } from '@/util/uint8array';
import { ElNotification } from 'element-plus';
import { ref, watch } from 'vue';

const props = defineProps<{
    data: Uint8Array,
    name: string
}>()
const emits = defineEmits<{
    (event: 'update', value: Uint8Array): void
}>()

const hex = ref(false)
const multiLine = ref(false)
const canEdit = ref(false)
const text = ref(toString(props.data))

watch(hex, (v, oldV) => {
    let a: Uint8Array
    if (oldV) {
        a = fromHex(text.value)!
    } else {
        a = fromString(text.value)
    }
    if (v) {
        text.value = toHex(a)
    } else {
        text.value = toString(a)
    }
})

const onClick = () => {
    if (canEdit.value) {
        if (hex.value) {
            const arr = fromHex(text.value)
            if (!arr) {
                ElNotification.error({
                    title: __('Error'),
                    message: __('Invalid hex string'),
                })
                return
            }
            emits('update', arr)
        } else {
            emits('update', fromString(text.value))
        }
    }
    canEdit.value = !canEdit.value
}

</script>

