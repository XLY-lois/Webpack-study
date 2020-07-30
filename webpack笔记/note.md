# webpack 打包工具->输出后的结果为js模块
---
### 安装
- 全局安装不建议
` npm install webpack -g`
- 安装
`npm init` 配置json文件等
`npm install webpack`
`npm install webpack-cli`


### 五个核心概念
- Entry webpack以哪个文件作为入口开始打包，分析内部依赖图
- Output 打包后的bundles输出到哪里呢？以及如何命名。
- Loader 让webpack处理非js文件（less css 图片之类的）
- Plugins 插件 执行范围更广的任务 打包优化 压缩等
- Mode 模式： 
    development  能让代码本地调试的运行环境
    production  能让代码优化上线运行的环境

### 新建一些文件夹
- dist 
- src 源码存放
   - css
   - js
   - images
- index.html 首页
- mian.js js入口文件

### 0配置运行
1. 打包
`npx webpack`
- 将所写的src自动生成一个在dist下面的main.js文件
2. 在html中引入 main.js

### 手动配置
##### 配置开发环境
//注意在使用指令之前要全局安装webpack
//1. 开发环境运行指令（其实也可以自己在package.json中修改）：webpack ./src/index.js -o ./build/build.js --mode=development
//   意思就是将入口文件index.js打包输出到builde文件夹下的build.js
//2. 生成环境指令：webpack ./src/index.js -o ./build/build.js --mode=production

##### 打包样式和图片资源
- 新建文件 webpack.config.js
- 配置config
   ```
   //webpack配置文件
    //由于是基于node的 所有采用commenjs语法

    const path = require('path');
    const { resolve } = require('path');

    module.exports = {
    //入口
    entry:'./src/index.js',
    //输出
    output:{//是个对象
        //输出文件名
        filename:'build.js',
        //路径
        path:resolve(__dirname,'build'),//__dirname是node中path模块提供的 代表当前文件目录绝对路径
    },
    //loader配置
    module:{
        rules:[
            {
                //匹配哪些文件
                test:/\.css$/,//遍历文件 一旦发现有.css结尾的文件便进行以下处理
                //使用哪些loader进行处理？
                use:[
                    //创建一个style标签 将js中的样式资源插入
                    'style-loader',

                    //将css以字符串形式变成commenjs模块加载到js中
                    'css-loader'
                ]
            }
        ]
    },
    //插件配置
    plugings:[
        //...
    ],
    //模式
    mode:'development'      
    }
   ```

- `npm i css-loader style-loader`
- 命令行执行 `webpack` 即可打包
---

