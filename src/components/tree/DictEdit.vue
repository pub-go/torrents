<template>
    <el-container class="edit-view is-vertical">
        <DictView :data="dict" @update="(val: BDict) => dict = val" :name="props.name" />
        <a ref="downloadLink" class="hidden" id="download">{{ __("Download") }}</a>
        <el-button type="primary" @click="download" class="mt4">{{ __('Download') }}</el-button>
    </el-container>
</template>
<style>
.edit-view li {
    overflow: auto;
}

.edit-view .bvalue {
    min-width: 280px;
}
</style>
<script setup lang="ts">
import type { BDict } from '@/bencode';
import { ref } from 'vue';
import DictView from './DictView.vue';

const props = defineProps<{
    data: BDict,
    name: string,
}>()

const dict = ref(props.data)

const downloadLink = ref<HTMLAnchorElement>()
const downloadURL = ref('')
const download = () => {
    URL.revokeObjectURL(downloadURL.value)
    downloadURL.value = URL.createObjectURL(new Blob([dict.value.Encode()]))
    downloadLink.value!.href = downloadURL.value
    downloadLink.value!.download = props.name
    downloadLink.value!.click()
}

</script>
