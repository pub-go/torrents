module.exports = {
    input: {
        path: "./src", // 只有该目录下的文件会被自动抽取
        include: ["**/*.js", "**/*.ts", "**/*.vue"], // 需要抽取的文件
        exclude: [], // 需要排除的文件
        jsExtractorOpts: [ // 自定义抽取关键字
            {
                keyword: "__", // 默认只抽取 $gettext 这些内置的关键字，可以通过 keyword 自定义
                options: {    // 详细说明可查看 https://github.com/lukasgeiter/gettext-extractor
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        text: 0, // 这个 __ 函数的第几个参数是待翻译字符串
                    },
                },
            },
            {
                keyword: "_n", // 对应 $ngettext
                options: {
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        text: 0,      // 第0个参数是待翻译字符串
                        textPlural: 1,// 第1个参数是复数字符串
                    },
                },
            },
            {
                keyword: "_x", // 对应 $pgettext
                options: {
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        context: 0,
                        text: 1,
                    },
                },
            },
            {
                keyword: "_xn", // 对应 $npgettext
                options: {
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        context: 0,
                        text: 1,
                        textPlural: 2,
                    },
                },
            },
        ],
    },
    output: {
        path: "./src/i18n/langs", // 抽取后生成的文件存放的路径
        potPath: "./messages.pot", // 相对于 output.path, 所以默认值是 "./src/language/messages.pot"
        jsonPath: "./", // 相对于 output.path, 所以默认值是 "./src/language/translations.json"
        locales: ["en", "zh_CN"], // 需要生成哪些语言的 po 文件
        flat: false, // 是否为每种语言单独创建一个文件夹
        linguas: false, // 创建一个 LINGUAS 文件
        splitJson: true, // 为每种语言生成一个 json 文件，如果为 true, jsonPath 应当是一个目录路径而不是一个文件路径
    },
};
