//webpack配置文件
//由于是基于node的 所有采用commenjs语法

const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            },
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
            },
            //处理html中的图片
            {
                test:/\.html$/,//专门处理html中的图片引入 从而能被url-loader处理
                loader:'html-loader'
            },
        ]
    },
    //插件配置
    plugins:[
        //功能 默认创建一个空的HTML 文件 并引入所有打包后的资源
        new HtmlWebpackPlugin({
            template:'./src/index.html',//复制这个文件作为上面创建的html的模板
        })
    ],
    //模式
    mode:'development'
}