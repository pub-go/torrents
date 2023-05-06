<script setup lang="ts">
import { _x } from '@/i18n/gettext';
import format from '@/util/format';
import { sizeString } from '@/util/size';
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus';
import { computed, reactive, ref } from 'vue';

// steps(index/下标) and tabs(value/值)
const items = ['type', 'add_file', 'settings', 'generate']

const active = ref(0)// steps
const activeName = computed({// tabs
  get: () => items[active.value],
  set: (name) => {// 点击 tab 时会 set, 不过后来用 css 隐藏了 tab
    const index = items.indexOf(name)
    if (index >= 0) { active.value = index }
  }
})

// step 1: select type
const descType = ref('')// step 1 desc
const isSingle = ref(false)
const selectType = (single: boolean) => {
  descType.value = single ? _x('desc', 'Single File') : _x('desc', 'Multi File')
  isSingle.value = single
  active.value = 1
}

// step 2: add file
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = (files) => {// 单文件: 覆盖之前的文件
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  uploadRef.value!.handleStart(file)
}
const handleFileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  form.torrentName = uploadFile.name// onChange 之后才会更新 fileList
}

const descFile = computed(() => {// // step 2 desc
  if (isSingle) {
    let name = fileList.value[0]?.name
    if (name && name.length > 40) {
      name = name.substring(0, 18) + '...' + name.substring(name.length - 18)
    }
    return name
  }
  return ''
})

// step 3: settings
const form = reactive({
  torrentName: '',
  pieceSize: 0,
  isPrivate: false,
  setCreation: true,
  trackers: '',
  webSeeds: '',
  comment: '',
  source: ''
})

// step 4
const done = ref(false)
</script>

<template>
  <el-container class="is-vertical">

    <el-steps class="w100%" :active="active" finish-status="success">
      <el-step :title="__('Select Type')" :description="descType" />
      <el-step :title="__('Add File')" :description="descFile" />
      <el-step :title="__('Settings')" />
      <el-step :title="__('Generate')" />
    </el-steps>

    <el-tabs v-model="activeName">
      <el-tab-pane :name="items[0]" :label="__('Select Type')">
        <div class="flex justify-around">
          <el-button type="primary" @click="selectType(true)">{{ _x('btn', 'Single File') }}</el-button>
          <el-button type="primary" @click="selectType(false)">{{ _x('btn', 'Multil File (Folder)') }}</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[1]" :label="__('Add File')">
        <div v-if="isSingle">
          <el-upload ref="uploadRef" drag :auto-upload="false" v-model:file-list="fileList" :limit="1"
            :on-exceed="handleExceed" :on-change="handleFileChange">
            <i i='ep-upload-filled' class="el-icon--upload inline-flex"></i>
            <div class="el-upload__text">
              {{ __('Drop file here or click to upload') }}
            </div>
          </el-upload>
        </div>
        <div class="flex justify-between">
          <el-button @click="active--">{{ __('Previous Step') }}</el-button>
          <el-button :disabled="fileList.length == 0" type="primary" @click="active++">{{ __('Next Step') }}</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[2]" :label="__('Settings')">
        <div>
          <el-form :model="form" label-width="120px">
            <el-form-item :label="__('File List')">
              <el-text v-if="isSingle && fileList.length > 0">
                {{ format(_x('file-size', '{0} ({1})'), fileList[0].name, sizeString(fileList[0].size!)) }}
              </el-text>
            </el-form-item>
            <el-form-item :label="__('Torrent Name')">
              <el-input v-model="form.torrentName" />
            </el-form-item>
            <el-form-item :label="__('Piece Size')">
              <el-select v-model="form.pieceSize" class="w100%">
                <el-option :label="__('Auto')" :value="0" />
                <el-option :label="__('16 KB')" :value="16384" />
                <el-option :label="__('32 KB')" :value="32768" />
                <el-option :label="__('64 KB')" :value="65536" />
                <el-option :label="__('128 KB')" :value="131072" />
                <el-option :label="__('256 KB')" :value="262144" />
                <el-option :label="__('512 KB')" :value="524288" />
                <el-option :label="__('1 MB')" :value="1048576" />
                <el-option :label="__('2 MB')" :value="2097152" />
                <el-option :label="__('4 MB')" :value="4194304" />
                <el-option :label="__('8 MB')" :value="8388608" />
                <el-option :label="__('16 MB')" :value="16777216" />
              </el-select>
            </el-form-item>
            <el-form-item :label="__('Is Private')">
              <el-switch v-model="form.isPrivate" />
            </el-form-item>
            <el-form-item :label="__('Creation Field')">
              <el-switch v-model="form.setCreation" />
            </el-form-item>
            <el-form-item :label="__('Trackers')">
              <el-input v-model="form.trackers" type="textarea" />
            </el-form-item>
            <el-form-item :label="__('Web Seeds')">
              <el-input v-model="form.webSeeds" type="textarea" />
            </el-form-item>
            <el-form-item :label="__('Comment')">
              <el-input v-model="form.comment" type="textarea" />
            </el-form-item>
            <el-form-item :label="__('Source')">
              <el-input v-model="form.source" />
            </el-form-item>
          </el-form>
          <div class="flex justify-between">
            <el-button @click="active--">{{ __('Previous Step') }}</el-button>
            <el-button type="primary" @click="active++">{{ __('Next Step') }}</el-button>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[3]" :label="__('Generate')">
        Generate
        <div class="flex justify-between">
          <el-button @click="active--">{{ __('Previous Step') }}</el-button>
          <el-button :disabled="!done" type="primary" @click="active++">{{ __('Download') }}</el-button>
        </div>
      </el-tab-pane>

    </el-tabs>

  </el-container>
</template>

<style scoped>
:deep(.el-tabs__header.is-top) {
  visibility: hidden;
}
</style>
