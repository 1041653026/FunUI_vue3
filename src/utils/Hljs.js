// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import 'highlight.js/styles/color-brewer.css'; // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件

function makeHlDirective(app) {
    app.directive('highlight', {
        // 被绑定元素插入父节点时调用
        mounted: function(el) {
            let blocks = el.querySelectorAll('code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightElement(blocks[i]);
            }
        },
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
        updated: function(el) {
            let blocks = el.querySelectorAll('code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightElement(blocks[i]);
            }
        }
    })
}
export default makeHlDirective;