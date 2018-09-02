# BEM 规范

## 简介

BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

[官方文档--核心概念](https://en.bem.info/methodology/key-concepts/) [中文版](http://note.youdao.com/noteshare?id=2cbd04f5a4d9d9b77a4faa529d108c67&sub=62AB5639DC6C4C6281AF3CD2F3132712)

[中文参考资源](https://segmentfault.com/a/1190000000391762)

## 使用方法
![示例图片](images/bem01.png)

像图中所示，多个tab按钮组成`block`，每个tab按钮为`element`，当点击tab按钮时，变化的样式为`modifier`。
此处的 CSS 样式结构为：
``` CSS
.tabGroup{} /* block，块；小驼峰表示法*/
.tabGroup__element{} /* element，元素；用“__”两个下划线表示，代表着组成 tabGroup 块的元素 */
.tabGroup__element--active{} /* modifier，修饰符；用“--”两个中杠表示，代表元素在点开时的状态 */
```
