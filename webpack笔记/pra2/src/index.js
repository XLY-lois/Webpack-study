//入口文件
//注意在使用指令之前要全局安装webpack
//1. 开发环境运行指令（其实也可以自己在package.json中修改）：webpack ./src/index.js -o ./build/build.js --mode=development
//   意思就是将入口文件index.js打包输出到builde文件夹下的build.js
//2. 生成环境指令：webpack ./src/index.js -o ./build/build.js --mode=production

// import data from './data.json'
import './index.css'
// import './index.less'
import '../iconfont/iconfont.css'

// console.log(data);

function add(x,y){
    return x+y;
}

console.log(add(1,2));