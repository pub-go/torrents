<script setup lang="ts">
import { BInt } from '@/bencode';
import { ref } from 'vue';
const props = defineProps<{
    data: BInt,
    name: string
}>()
const emits = defineEmits<{
    (event: 'update', value: BInt): void
}>()

const num = ref(props.data.value)
const canEdit = ref(false)
const onClick = () => {
    if (canEdit.value) {
        emits('update', new BInt(num.value))
    }
    canEdit.value = !canEdit.value
}

</script>
<template>
    <details class="mt4 pl pt pb b b-dashed">
        <summary class="cursor-pointer">
            <el-row class="inline-flex w95%">
                <el-col :span="12">{{ props.name }}</el-col>
                <el-col :span="12">{{ __('Integer') }}</el-col>
            </el-row>
        </summary>
        <el-row>
            <el-col :span="20">
                <el-input v-model="num" type="number" :disabled="!canEdit" />
            </el-col>
            <el-col :span="4" class="flex justify-center">
                <el-button @click="onClick">{{ canEdit ? __('OK') : __('Edit') }}</el-button>
            </el-col>
        </el-row>
    </details>
</template>
