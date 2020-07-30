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