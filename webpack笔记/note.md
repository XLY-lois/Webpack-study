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
    //不同的文件要配置不同的loader
    module:{
        rules:[
            //CSS
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
            },
            //less
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    //将 CSS -> JS
                    'css-loader',
                    //将 less -> CSS
                    'less-loader',
                ]
            }
        ]
    },
    //插件配置
    plugins:[
        //...
    ],
    //模式
    mode:'development'
    }
   ```

- `npm i css-loader style-loader`
- 命令行执行 `webpack` 即可打包

##### 打包html
- 下载包 `npm install html-webpack-plugin -D`
- 引入调用插件 在 webpack.config.js 中 
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
//some code

 //插件配置
    plugins:[
        //功能 默认创建一个空的HTML 文件 并引入所有打包后的资源
        new HtmlWebpackPlugin({
            template:'./src/index.html',//复制这个文件作为上面创建的html的模板
        })
    ],
```
- 打包 命令行`webpack`
   此时 在build目录下会自动生成一个新的index.html 并且这个新的文件会自动引入build.js
   所以要记住 自己写的html中不能引入js 重复引入会出问题

##### 打包图片资源
1. 
- 装包 `npm i file-loader url-loader -D`
   前者是后者的依赖 所以要装两个包
- webpack.config.js 中的 module加入
- 但是这种方法只能处理css中引进的图片 比方说bg-img url(...)
```
 //图片资源 
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    //图片大小小于8kb就会被base64处理
                    //优点 减少请求数量（减轻服务器的压力）
                    //缺点 图片体积会大一点 请求速度就会慢一些
                    limit:8*1024,//8kb
                }
            }
```

2. 要处理html中标签引入的图片要这样做
- 装包 `npm install html-loader -D`
- webpack.config.js 中加入
```
//处理html中的图片
            {
                test:/\.html$/,//专门处理html中的图片引入 从而能被url-loader处理
                loader:'html-loader'
            },
```
- 此时再打包 再build中的index.html中就会有img标签

##### 打包其他资源（比如字体啊 字体啊 字体啊之类的）
- congig中 的 module
```
 {//打包其他资源(排除css js html 之外的资源)
                exclude:/\.(css|js|html)$/,
                loader:'file-loader'
    
}
```

- src中的index.html
```
    <span class="iconfont icon-icon-test"></span>
    <span class="iconfont icon-icon-test1"></span>
    <span class="iconfont icon-icon-test2"></span>
    <span class="iconfont icon-icon-test3"></span>
```

- src中的index.js 引包
`import '../iconfont/iconfont.css'`
- 别忘了把下载下来的iconfont文件放在这个目录里再引包哦
---

