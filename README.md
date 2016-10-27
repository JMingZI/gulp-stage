# gulp-stage
gulp脚手架，主要功能：分测试与开发环境；能够指定打包目录；es6语法环境；md5戳；公共文件合并；html模版；

#### 用法说明
```yaml
/**
 * gulp 脚手架
 * @author Jmingzi
 * @time 16/10/26
 * 参数：--env production 打包到线上
 *       --dir caiyun/masheng 打包的文件夹名称 默认为dest 
 * 使用方法：
 *      gulp 测试环境 打包到dest目录 
 *      gulp --env production --dir caiyun 打包线上的彩云
 */
 ```

#### 目录说明
```
    ./src  #开发目录
    ./src/css/_reset.scss  #私有sass文件
    ./src/css/module/module_sass.scss  #你的模块sass文件
    ./src/js  #js文件
    ./src/jslib  #js库文件
    ./src/images  #图片
    ./src/fonts/  #字体文件
```

