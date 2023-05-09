<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    data: number,
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
    <el-row>
        <el-col :span="20">
            <el-input v-model="value" type="number" :disabled="!canEdit" />
        </el-col>
        <el-col :span="4" class="flex justify-center">
            <el-button @click="onClick">{{ canEdit ? __('OK') : __('Edit') }}</el-button>
        </el-col>
    </el-row>
</template>
