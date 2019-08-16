### Modal组件
确认框组件，主要用于一些操作之前的再次确认

参数列表：
参数|类型|默认值|含义
---|:--:|---:|---:
title|字符串|无|头部标题，默认居左
showModal|布尔值|false|是否显示Modal组件
content|react节点|''|内容区域
customFooter|react节点|false|是否自定义footer
afterConfirm|func|空函数|确认回调
afterClose|func|空函数|取消回调/关闭回调

示例用法：
```javascript
const {apiLink, content, isLogin, afterConfirm} = props;
<Modal content={content} title='提示'
   afterConfirm={afterConfirm}
   afterClose={afterClose}
   showModal={showModal}>
</Modal>
```

Modal组件存在的问题：
1. content与footer需要传入，怎样才能更方便自定义，以及抽取公用部分呢？
2. 组件样式
