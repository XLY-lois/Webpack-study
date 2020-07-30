# webpack-pra1笔记
---
1. `npm init` 配置json文件等
### 五个核心概念
- Entry webpack以哪个文件作为入口开始打包，分析内部依赖图
- Output 打包后的bundles输出到哪里呢？以及如何命名。
- Loader 让webpack处理非js文件（less css 图片之类的）
- Plugins 插件 执行范围更广的任务 打包优化 压缩等
- Mode 模式： 
    development  能让代码本地调试的运行环境
    production  能让代码优化上线运行的环境