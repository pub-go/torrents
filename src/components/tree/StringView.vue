<script setup lang="ts">

import { __ } from '@/i18n/gettext';
import { fromHex, fromString, toHex, toString } from '@/util/uint8array';
import { ElNotification } from 'element-plus';
import { ref, watch } from 'vue';

const props = defineProps<{
    data: Uint8Array
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
        if (hex) {
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

<template>
    <el-row>
        <el-col :span="12">
            <el-input v-model="text" :type="multiLine ? 'textarea' : 'text'" :disabled="!canEdit" />
        </el-col>
        <el-col :span="4" class="flex justify-center">
            <el-checkbox v-model="hex">{{ __('Hex') }}</el-checkbox>
        </el-col>
        <el-col :span="4" class="flex justify-center">
            <el-checkbox v-model="multiLine">{{ __('Multi Line') }}</el-checkbox>
        </el-col>
        <el-col :span="4" class="flex justify-center">
            <el-button @click="onClick">{{ canEdit ? __('OK') : __('Edit') }}</el-button>
        </el-col>
    </el-row>
</template>