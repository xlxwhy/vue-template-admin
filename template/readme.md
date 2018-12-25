
## 概况

此文档仅记录相关创建vue-template-admin过程中所遇到的一些问题<br>


## 相关链接
 
[webpack文档](https://webpack.js.org/concepts/)  <br>

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)  <br>
[vue-element-admin文档](https://panjiachen.github.io/vue-element-admin-site/#/)  <br>

[vue-template-admin](http://github.com/xlxwhy/vue-template-admin)  <br>
[vue-template-mobile](http://github.com/xlxwhy/vue-template-mobile)  <br>



## 问题汇总

## vue-element-mobile

https://github.com/xlxwhy/vue-template-mobile/blob/master/template/readme.md

## style引入scss

``` css
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/template2/styles/mixin.scss";   /*错误：File to import not found or unreadable  */
  @import "~@/template2/styles/mixin.scss";  /*正确*/ 
</style>
```


## npm run dev出错，但没有任何错误信息

原因：
- npm run dev所触发的脚本出错。如没有对应的文件、文件夹等脚本错误
- 打不到index.html

解决：执行【npm run build】可以输出错误信息


## 使用webpack-dev-server
原Admin环境使用express单独构建开发服务器（build/dev-server.js）<br>
但github项目vue-element-admin使用webpack-dev-server<br>
vue-template-mobile项目也是使用webpack-dev-server<br>
vue-template-admin也准备使用webpack-dev-server作为开发服务器<br>



## vue-loader.conf

github项目vue-element-admin不作任何配置：https://github.com/PanJiaChen/vue-element-admin/blob/master/build/vue-loader.conf.js<br>
但旧Admin项目一直有配置，暂时保留



## 启动信息异常：进度信息右移
https://github.com/PanJiaChen/vue-admin-template
此项目存在【进度信息右移】的问题，不明原因

本工程没有异常



## *.svg的loader

需要两个loader
- svg-sprite-loader：指定加载的目录
- url-loader：排除svg-sprite-loader加载的目录


## build/utils.js与config/index.js
build/utils.js已经引入config/index.js，所以config/index.js不能再引用build/utils.js




## 深层router路径有误

现象：正确的菜单路径是【#/nested/menu1/menu1-1】，但页面显示的是【#/menu1/menu1-1】<br>
原因：从【/views/layout/components/Sidebar/SidebarItem.vue】代码中看出，这里只使用了两级路由
``` html
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link  ...  :to="item.path+'/'+item.children[0].path"  ... >
        ...
      </router-link>
       ... 
    </template>
```
解决：使用新版vue-element-admin，顺带解决旧版本可能隐藏的一些bug



## permission

原理：
- router分为constantRouterMap、asyncRouterMap。
- 在首次切换router时，根据当前用户的角色过滤asyncRouterMap再合并constantRouterMap，动态生成routers。
- 在【/views/layout/components/Sidebar/index.vue】中通过store的permission_routers来生成左边菜单




## router已经生效，但是菜单没有显示

原因：Sidebar是使用store中的permission_routers来获得生效的routers，如果在router切换时不作任何处理时，permission_routers获得的是空router，但实际上constantRouterMap已经生效，只是界面没有生效对应的菜单。
解决：如果不作角色权限控制，需要加入以下代码

``` js
router.beforeEach((to, from, next) => {
  ...
  //暂时不作角色权限控制
  store.commit('SET_ROUTERS', []); //仅生效constantRouterMap 
  ...
})
```


## 支持深层路由

旧版vue-element-admin仅支持两级路由，新版支持超过两级的路由

## _import.js
继续使用_import.js，代码会相对简洁



## 引入样式的方式

### 路径
如果是相对路径
``` css
@import "./styles/index.scss"; 
```
如果是第三方库
``` css
@import '~normalize.css/normalize.css'; 
@import '~element-ui/lib/theme-chalk/index.css';
@import '~font-awesome/css/font-awesome.min.css';

```
### 位置
以全局样式为例，可以在三个地方引入：
- 在main.js中引入
- 在App.vue的script中引入
- 在App.vue的style中引入，但不能是scoped

建议在App中的style中引入全局样式，script中引入全局脚本

## 【main.js】：import 'normalize.css/normalize.css'

Normalize.css是一种CSS reset的替代方案。它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案（https://necolas.github.io/normalize.css/7.0.0/normalize.css）



## router、store文件夹不使用复数

export的是一个Router对象，不适合用复数
``` js
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

```

store文件夹同理


## 前端三层结构

考虑代码的复用及个性化处理，每种文件都可以有三个层次的位置安放
- 第一层：简称VUE层，如/src/template/api/MemberApi.js，
- 第二层：简称Webpack层，如/library/api/MemberApi.js，各Vue层公共的文件都可以放在此层
- 第三层：简称NPM层，实际就是第三方的依赖包，如果common-layer，各Webpack、VUE层公共的文件都可以放在此层



## 固定语言

修改以下文件：./lang/index.js
``` js
const i18n = new VueI18n({ 
  locale: 'zh',
})

```

## api

api的文件一般可以存放在三个地方
- Vue工程内的apis文件夹，不推荐
- Webpack工程的library/apis文件夹，如果不使用common-layer，则推荐放于此位置
- NPM依赖库，如common-layer

## main.js

main文件一般需要初始化很多的功能模块，建议拆分
- main.js
- main-axios.js
- main-permission.js
- main-prototype.js
- ./filters/init.js
- ./icons/init.js
- ./components/init.js


## 大小写的问题

警告信息：There are multiple modules with names that only differ in casing.<br>
有两个原因：<br>
- 使用cd命令时，路径的大小写弄错了，虽然可以进行指定的文件夹，但会出现警告
- 如果路径大小写正确但还会警告，则删除node_modules重新安装即可

``` js
cd  "/e/XDEV/temp/vta3"
cd  "/e/xdev/temp/vta3"
```

## 更多的官方例子

https://panjiachen.gitee.io/vue-element-admin/#/dashboard




## 创建模板工程

可定制common-layer












