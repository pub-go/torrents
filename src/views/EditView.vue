<template>
    <el-container class="is-vertical">
        <el-upload ref="uploadRef" drag :auto-upload="false" v-model:file-list="fileList" :limit="1"
            accept=".torrent,application/x-bittorrent" :on-exceed="handleExceed">
            <i i='ep-upload-filled' class="el-icon--upload inline-flex"></i>
            <div class="el-upload__text">
                {{ __('Drop file here or click to upload') }}
            </div>
        </el-upload>
        <div class="flex justify-between">
            <el-button @click="reset">{{ __('Reset') }}</el-button>
            <el-button type='primary' :disabled="disabledViewBtn" @click="view" :loading="loading">
                {{ __('View') }}
            </el-button>
        </div>
        <DictView :data="dict" name="root" v-if="show" />
        <div hidden><el-button @click="debug">log</el-button></div>
    </el-container>
</template>

<script setup lang="ts">
import { BDict, decode } from '@/bencode';
import DictView from '@/components/tree/DictView.vue';
import { __ } from '@/i18n/gettext';
import { format } from '@/util/format';
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus';
import { ElNotification } from 'element-plus';
import { computed, ref } from 'vue';

const show = ref(false)
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = (files) => {// 单文件: 覆盖之前的文件
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    uploadRef.value!.handleStart(file)
    show.value = false
}
const reset = () => {
    uploadRef.value?.clearFiles()
    dict.value = new BDict({})
    show.value = false
}
const disabledViewBtn = computed(() => fileList.value.length === 0)
const loading = ref(false)
const view = async () => {
    // if (disabledViewBtn) return
    loading.value = true
    try {
        console.log('ready to read')
        // const buf = fromString('de')
        const buf = await fileList.value[0].raw!.slice().arrayBuffer()
        console.log('buffer:', buf)
        const value = decode(new Uint8Array(buf!))
        if (value.Type() !== 'dict') throw new Error(__('not torrent file'))
        dict.value = value as BDict
        show.value = true
    } catch (e) {
        ElNotification.error({
            title: __('Error'),
            message: format(__('Can not view this file: {0}'), e),
        })
    }
    loading.value = false
}
const dict = ref<BDict>(new BDict({}))
const debug = () => { console.log(dict.value) }
</script>

