import { createGettext } from "vue3-gettext";
// 需要配合 .d.ts 才能识别为模块
import en from 'element-plus/dist/locale/en.mjs';
import zhCN from 'element-plus/dist/locale/zh-cn.mjs';
import { computed } from "vue";

// displaySelf 用自身语言显示自己的语言名称
function displaySelf(lang: string) {
    lang = lang.replace('_', '-')// JS Intl 中需要使用 zh-CN 中划线形式
    const langName = new Intl.DisplayNames([lang], { type: 'language' })
    return `[${lang}] ${langName.of(lang)}`
}

// 项目可用的语言
const available = {
    en: displaySelf('en'),
    'zh_CN': displaySelf('zh_CN'),// gettext 中需要用 ll_CC 下划线形式的
}

// exported ElementPlus 的语言文件
const elLocale = computed(() => {
    switch (gettext.current) {
        case 'zh_CN': return zhCN;
        default: return en;
    }
})

const sourceCodeLang = 'en';// 源代码中使用的语言

// getDefaultLang 通过浏览器偏好返回用户首选语言
function getDefaultLang(support: string[]) {
    if (!support || support.length == 0) {
        return sourceCodeLang
    }
    for (let lang of navigator.languages) {
        lang = lang.replace('-', '_')// JS 中 navigator 返回的也是中划线形式的
        if (support.includes(lang)) return lang
    }
    return sourceCodeLang
}

// exported 导出实例
const gettext = createGettext({
    availableLanguages: available,
    sourceCodeLanguage: sourceCodeLang,
    defaultLanguage: getDefaultLang(Object.keys(available)),
    setGlobalProperties: true,
    globalProperties: {
        gettext: ['__'],
        ngettext: ['_n'],
        pgettext: ['_x'],
        npgettext: ['_xn'],
    },
    silent: true,
})

// changeLang exported 导出切换语言方法
async function changeLang(lang: string) {
    try {
        const translate = await import(`./langs/${lang}.json`)
        gettext.translations = translate.default
        gettext.current = lang
    } catch (e) { }
}

(async () => {
    await changeLang(gettext.current)// 注意这里需要 await
})()

export { elLocale, gettext, changeLang };
