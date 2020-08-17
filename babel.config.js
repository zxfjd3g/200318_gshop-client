module.exports = {
  presets: [ // 预设包: 包含多个必用的babel插件的集合包
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "babel-plugin-component", // 对组件进行按需引用打包的babel插件
      {
        "libraryName": "element-ui", // 专门针对element-ui库
        "styleLibraryName": "theme-chalk" // 指定查找组件对应的css的目录
      }
    ]
  ]
}
