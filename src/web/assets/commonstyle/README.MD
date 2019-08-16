### 资源加载错误
```html
报错：localhost/:1 Refused to apply style from 'http://localhost:8022/assets/style/reset.css' 
because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```

1. 第一次是通过设置module.noParse不解析指定的第三方库的路径下js文件解决，发现原因是第三方库在
document.write引用自身其他依赖css、config.js时用的是相对路径，结果导致浏览器请求静态资源
时路径错误返回404、Cannot GET xxx等，自然就解析成了'text/html。
2. 粗暴点直接把源码里的依赖路径改成项目对应路径下就搞定了。
3. Google search suggests that many people with this error are seeing it 
because that URL is actually returning an error page, not a stylesheet.


### cssModule方案 = style-loader+css-laoder
style-loader options 
* injectType
    * 'styleTag' =>
    `<style>
       .foo {
         color: red;
       }
     </style><style>
       .bar {
         color: blue;
       }
     </style>`
     * singletonStyleTag
     `<style>
        .foo {
          color: red;
        }
        .bar {
          color: blue;
        }
      </style> `
* sourceMap:true
* 上面这些都可以不要设置，只需要style-laoder就可以了

css-loader options
```javascript
options: {
    importLoaders: 1, //css-loader之前设置多少个loader
    modules: true
}
```

classname库处理样式混合

### css架构示意
layout+reset=>mixin=>从index.js导入 可直接使用的样式名

variable(颜色定义)+utils(定义的一些方法) @import导入到样式中去

### pure css + css modules

