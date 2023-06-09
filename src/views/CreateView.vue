<template>
  <el-container class="is-vertical">
    <el-steps class="w100%" :active="active" finish-status="success">
      <el-step :title="__('Select Type')" :description="descType" />
      <el-step :title="__('Add File')" :description="descFile" />
      <el-step :title="__('Settings')" :description="descSettings" />
      <el-step :title="__('Generate')" :description="descGenerate" />
    </el-steps>

    <el-tabs v-model="activeName">
      <el-tab-pane :name="items[0]" :label="__('Select Type')">
        <div class="flex justify-around">
          <el-button type="primary" @click="selectType(true)">{{ _x('btn', 'Single File') }}</el-button>
          <el-button type="primary" @click="selectType(false)">{{ _x('btn', 'Folder') }}</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[1]" :label="__('Add File')">
        <div v-if="isSingle">
          <el-upload ref="uploadRef" drag :auto-upload="false" v-model:file-list="fileList" :limit="1"
            :on-exceed="handleExceed">
            <i i='ep-upload-filled' class="el-icon--upload inline-flex"></i>
            <div class="el-upload__text">
              {{ __('Drop file here or click to upload') }}
            </div>
          </el-upload>
        </div>
        <div v-else>
          <el-upload ref="uploadRef" drag :auto-upload="false" v-model:file-list="fileList" multiple>
            <i i='ep-upload-filled' class="el-icon--upload inline-flex"></i>
            <div class="el-upload__text">
              {{ __('Drop file here or click to upload') }}
            </div>
            <template #tip>
              <div class="el-upload__tip">
                {{ canUploadFolder ? __('Plsease select a folder.') : folderNotSupportTip }}
              </div>
            </template>
          </el-upload>
        </div>

        <div class="flex justify-between">
          <el-button @click="active--">{{ __('Previous Step') }}</el-button>
          <el-button v-if="!isSingle" @click="canUploadFolder = !canUploadFolder">
            <template v-if="canUploadFolder">{{ __('Can not upload a folder?') }}</template>
            <template v-if="!canUploadFolder">{{ __('Try upload a folder') }}</template>
          </el-button>
          <el-button v-if="fileList.length > 0" @click="uploadRef?.clearFiles()">{{ __('Clear Files') }}</el-button>
          <el-button :disabled="fileList.length == 0" type="primary" @click="fileSelected">
            {{ __('Next Step') }}
          </el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[2]" :label="__('Settings')">
        <div>
          <el-form :model="form" label-width="120px">

            <el-form-item :label="__('Folder Name')" v-if="!isSingle">
              <el-text v-if="canUploadFolder">{{ form.folderName }}</el-text>
              <el-input v-else v-model="form.folderName" />
            </el-form-item>

            <el-form-item :label="__('File List')">
              <ul>
                <li v-for="(file, idx) in fileList">
                  <el-button :icon="Delete" @click="deleteFile(idx)" />
                  {{ format(_x('file-size', '{0} ({1})'),
                    file.raw?.webkitRelativePath
                      ? file.raw?.webkitRelativePath
                      : file.name, sizeString(file.size!)) }}
                </li>
              </ul>
            </el-form-item>

            <el-form-item :label="__('Piece Size')">
              <el-select v-model="form.pieceSize" class="w100%">
                <el-option :label="format(__('Auto ({0})'), sizeString(genPieceSize(totalSize)))" :value="0" />
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

            <el-form-item :label="__('Read Block Size')">
              <el-row class="w100%">
                <el-col :xs="24" :sm="12" :md="4">
                  <el-select v-model="form.readBlockSize" class="w100%">
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
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-input v-model="form.readBlockSize" type="number">
                    <template #append>
                      {{ format(__('Bytes / {0}'), sizeString(form.readBlockSize)) }}
                    </template>
                  </el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="14">
                  <el-text> {{
                    __('read file by block: set block size larger to make reading faster (and cost more memory).')
                  }}</el-text>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item :label="__('Is Private')">
              <el-switch v-model="form.isPrivate" />
            </el-form-item>
            <el-form-item :label="__('Creation Date')">
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
            <el-button type="primary" :disabled="fileList.length == 0" @click="submitSettings">
              {{ __('Next Step') }}
            </el-button>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane :name="items[3]" :label="__('Generate')">

        <el-progress :percentage="progressOps.pct" :status="progressOps.status" :text-inside="true" :stroke-width="26"
          class="mb-4" :striped="progressOps.pct < 100" :striped-flow="progressOps.pct < 100" />
        <div class="flex flex-wrap gap-4">
          <el-text>{{ format(__('Total Size: {0} Bytes / {1}'), totalSize, sizeString(totalSize)) }}</el-text>
          <el-text>{{ format(__('Piece Size: {0} Bytes / {1}'), pieceSize, sizeString(pieceSize)) }}</el-text>
          <el-text>{{ format(__('Block Size: {0} Bytes / {1}'), form.readBlockSize,
            sizeString(form.readBlockSize)) }}
          </el-text>
          <el-text>{{ format(__('Spend: {0}'), duration(spend)) }}</el-text>
          <el-text>{{ format(__('Remaining: ~ {0}'), duration(remaining)) }}</el-text>
          <el-text v-if="progressOps.workerCount">{{ format(__('Worker Count: {0}'), progressOps.workerCount) }}</el-text>
          <el-text v-if="progressOps.buzyWorker.length > 0">
            {{ format(__('Buzy Workers: [{0}]'), progressOps.buzyWorker) }}
          </el-text>
          <el-text v-if="progressOps.waitingTask">{{ format(__('Waiting Task: {0}'), progressOps.waitingTask) }}</el-text>
        </div>

        <div class="flex justify-between">
          <el-button @click="active = STEP_SETTINGS; done = false; genVersion = ''">{{ __('Previous Step') }}</el-button>
          <el-button :disabled="!done" type="info" :icon="showPreview ? ArrowUp : ArrowDown" @click="togglePreview">
            {{ __('Preview') }}
          </el-button>
          <a ref="downloadLink" class="hidden" id="download">{{ __("Download") }}</a>
          <el-button :disabled="!done" type="primary" @click="download">{{ __('Download') }}</el-button>
        </div>
        <DictEdit v-if="showPreview" :data="dict" :name="`${torrent.info.name}.torrent`" />
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>


<script setup lang="ts">
import { BDict, toBValue } from '@/bencode';
import DictEdit from '@/components/tree/DictEdit.vue';
import { __, _x } from '@/i18n/gettext';
import type { Torrent } from '@/model/torrent';
import { genFilesSha1 } from '@/util/file';
import { duration, format, toFixed } from '@/util/format';
import { sizeString } from '@/util/size';
import { ArrowDown, ArrowUp, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElNotification, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';

// steps(index/下标) and tabs(value/值)
const items = ['type', 'add_file', 'settings', 'generate']
const STEP_FILE = 1
const STEP_SETTINGS = 2

const active = ref(0)// steps
const activeName = computed({// tabs
  get: () => items[active.value],
  set: (name) => {// 点击 tab 时会 set, 不过后来用 css 隐藏了 tab
    const index = items.indexOf(name)
    if (index >= 0) { active.value = index }
  }
})

// step 1: select type
const isSingle = ref(false)
const canUploadFolder = ref('webkitdirectory' in document.createElement('input'))
const selectType = (single: boolean) => {
  isSingle.value = single
  active.value = STEP_FILE
  uploadRef.value!.clearFiles();
  if (canUploadFolder) {
    const input = document.querySelector<HTMLInputElement>('.el-upload__input');
    if (input) {
      input.webkitdirectory = !single
    }
  }
}

watch(canUploadFolder, (val) => {
  if (!isSingle.value) {
    const input = document.querySelector<HTMLInputElement>('.el-upload__input');
    if (input) {
      input.webkitdirectory = val
    }
  }
})

const folderNotSupportTip = __('Your broswer does not support select folder, please select files one by one. (All files should be on the same folder.)')

const descType = computed(() => {
  if (active.value > 0) {
    return isSingle.value ? _x('desc', 'Single File') : _x('desc', 'Folder')
  }
  return ''
})

// step 2: add file
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = (files) => {// 单文件: 覆盖之前的文件
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  uploadRef.value!.handleStart(file)
}

function fileSelected() {
  active.value = STEP_SETTINGS
  form.folderName = getFolderName()
}

function getFolderName() {
  if (canUploadFolder && fileList.value.length > 0) {
    const path = fileList.value[0].raw?.webkitRelativePath
    if (path) {
      return path.split('/')[0]
    }
  }
  return ''
}

function getFilePath(f: UploadUserFile) {
  const path = f.raw?.webkitRelativePath
  if (path) { return path }
  return f.name
}

const descFile = computed(() => {// // step 2 desc
  if (active.value < STEP_FILE) return ''
  if (isSingle.value) {
    let name = fileList.value[0]?.name
    if (name && name.length > 40) {
      name = name.substring(0, 18) + '...' + name.substring(name.length - 18)
    }
    return name
  } else if (fileList.value.length > 0) {
    return format(__('{0} Files'), fileList.value.length)
  }
  return ''
})

// step 3: settings
const form = reactive({
  folderName: '',
  pieceSize: 0,
  readBlockSize: 16777216,// 16 MB
  isPrivate: false,
  setCreation: true,
  trackers: '',
  webSeeds: '',
  comment: '',
  source: ''
})

const deleteFile = (idx: number) => {
  fileList.value.splice(idx, 1)
}

const descSettings = computed(() => {
  if (active.value <= STEP_SETTINGS) { return '' }
  let desc = ''
  if (isSingle) {
    const size = fileList.value[0]!.size!
    desc += sizeString(size)
    if (form.isPrivate) {
      desc = format(_x('settings desc', 'PT ({0})'), sizeString(size))
    } else {
      desc = format(_x('settings desc', 'BT ({0})'), sizeString(size))
    }
  }
  return desc

})

const submitSettings = () => {
  if (!isSingle.value && !canUploadFolder && form.folderName === '') {
    return showError(__('Folder name can not be empty.'))
  }

  if (form.trackers !== '') {
    const trackers = form.trackers.trim().split(/\s+/g)
    for (let url of trackers) {
      try {
        new URL(url)
      } catch (e) {
        return showError(format(__('invalid tracker URL: {0}'), url))
      }
    }
  }
  active.value++
  generate()
}

function showError(msg: string) {
  ElNotification.error({
    title: __('Error'),
    message: msg,
  })
}

// step 4
const done = ref(false)
const progressOps = reactive({
  pct: 0,
  status: '',
  workerCount: 0,
  waitingTask: 0,
  buzyWorker: [] as number[]
})

const costMs = ref(0)
const descGenerate = computed(() => {
  if (done.value) {
    return format(__('done ({0})'), duration(costMs.value))
  }
  return ''
})

const torrent = ref<Torrent>({
  announce: '',        // 服务器
  "announce-list": [], // 多个服务器
  "created by": 'https://pub-go.github.io/torrents/', // 创建者
  // "creation date": new Date().getTime() / 1000,    // 创建时间
  // comment:'',     // 注释
  // "url-list": [], // 下载链接
  info: {
    name: '',
    "piece length": 0,
    pieces: new Uint8Array(),
  },
})

const downloadLink = ref<HTMLAnchorElement>()
const downloadURL = ref('')

const genVersion = ref('')
const totalSize = computed(() => fileList.value.reduce((sum, i) => sum + i.size!, 0))
const pieceSize = computed(() => {
  if (form.pieceSize !== 0) return form.pieceSize;
  return genPieceSize(totalSize.value);
})

const spend = ref(0)
const remaining = ref(0)

const generate = async () => {
  done.value = false
  showPreview.value = false
  progressOps.pct = 0
  progressOps.status = ''
  progressOps.workerCount = 0
  progressOps.waitingTask = 0
  progressOps.buzyWorker = []
  const start = new Date().getTime()
  spend.value = 0
  remaining.value = 0
  genVersion.value = start + ''
  if (form.trackers) {
    const trackers = form.trackers.trim().split(/\s+/g)
    torrent.value.announce = trackers[0]
    torrent.value['announce-list'] = trackers.map(url => [url])
  } else {
    delete torrent.value.announce
    delete torrent.value['announce-list']
  }

  if (form.setCreation) {
    torrent.value['creation date'] = (new Date().getTime() / 1000) | 0
  }
  else { delete torrent.value['creation date'] }

  if (form.comment) { torrent.value.comment = form.comment }
  else { delete torrent.value.comment }

  const urlList = form.webSeeds.split(/\s+/g)
  if (form.webSeeds) { torrent.value['url-list'] = urlList }
  else { delete torrent.value['url-list'] }

  const name = getTorrentName()
  torrent.value.info.name = name
  downloadLink.value!.download = name + '.torrent'

  if (form.pieceSize) {
    torrent.value.info['piece length'] = form.pieceSize
  } else {
    torrent.value.info['piece length'] = genPieceSize(totalSize.value)
  }

  if (isSingle.value) {
    torrent.value.info.length = fileList.value[0].size!
  } else {
    torrent.value.info.files = fileList.value.map(f => ({
      length: f.size!,
      path: getFilePath(f).split('/'),
    }))
  }

  try {
    torrent.value.info.pieces = await genFilesSha1(
      fileList.value.map(f => f.raw!),
      form.readBlockSize,
      torrent.value.info['piece length'],
      genVersion.value,
      (data) => {
        spend.value = (new Date().getTime()) - start;
        // read:spend = left:remaining => remaining = spend*left/read
        remaining.value = toFixed(spend.value * (data.total - data.current) / data.current, 0)
        progressOps.pct = toFixed(100 * data.current / data.total, 2);
        if (data.current === data.total) {
          progressOps.status = 'success'
        }
        progressOps.workerCount = data.workerCount
        progressOps.waitingTask = data.waitingTask
        progressOps.buzyWorker = Array.from(data.buzyWorker).sort()
        return data.version == genVersion.value
      },
    );
  } catch {
    ElMessage.info({ message: __('task canceled.') })
    return
  }

  costMs.value = new Date().getTime() - start
  ElMessage.success({
    message: format(__('Generate torrent file success. ({0})'), duration(costMs.value)),
  })
  done.value = true
  URL.revokeObjectURL(downloadURL.value)

  downloadURL.value = URL.createObjectURL(new Blob([toBValue(torrent.value).Encode()]))
  downloadLink.value!.href = downloadURL.value
}

function getTorrentName() {
  if (isSingle.value) {
    return fileList.value[0].name
  }
  return form.folderName
}

function genPieceSize(totalSize: number) {
  // Why/How?
  // copy from https://github.com/Kimbatt/torrent-creator/blob/gh-pages/index.ts
  let factor = Math.round(Math.log(totalSize / 1200) / Math.log(2))
  if (factor < 14)
    factor = 14; // => 16 KB
  else if (factor > 24)
    factor = 24; // => 16 MB
  return 1 << factor;
}

const download = () => {
  active.value = items.length
  downloadLink.value!.click()
}

const showPreview = ref(false)
const dict = ref(new BDict({}))
const togglePreview = () => {
  showPreview.value = !showPreview.value
  dict.value = toBValue(torrent.value) as BDict
}
</script>


<style scoped>
:deep(.el-tabs__header.is-top) {
  visibility: hidden;
}
</style>
