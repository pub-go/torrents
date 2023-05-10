<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    data: number,
    name: string
}>()
const emits = defineEmits<{
    (event: 'update', value: number): void
}>()

const value = ref(props.data)
const canEdit = ref(false)
const onClick = () => {
    if (canEdit.value) {
        emits('update', value.value)
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
                <el-input v-model="value" type="number" :disabled="!canEdit" />
            </el-col>
            <el-col :span="4" class="flex justify-center">
                <el-button @click="onClick">{{ canEdit ? __('OK') : __('Edit') }}</el-button>
            </el-col>
        </el-row>
    </details>
</template>
