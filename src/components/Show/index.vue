<template>
    <div class='showPart' :style='{...extendStyle}'>
        <main class='main'>
            <slot name='main'></slot>
        </main>
        <div :class="{bottom: true, sticky_bottom: supportSticky}">
            <section class='code' ref='codeBox'>
                <slot name='code'></slot>
            </section>
            <footer :class='{footer: true, activeFooter: isShowCode, sticky_footer: supportSticky}' @click='changeShow'>
                <span class="triangle"></span>
                <p class="guide">{{guide}}</p>
            </footer>
        </div>
        
    </div>
</template>

<script>
/***
 * @codeHeight    String     code部分高度，用于过渡动画
 */
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
    name: 'Show',
    props: {
        codeHeight: {
            type: String,
            default: '0'
        },
        style: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        const isShowCode = ref(false); // 是否显示代码
        const guide = ref('显示代码'); // 显示/隐藏代码
        const supportSticky = ref(false); // 是否支持sticky粘性定位
        const codeBox = ref(null); // code元素ref
        const extendStyle = props.style; // 样式

        // 测试当前浏览器是否支持粘性定位
        function testSticky() {
            let body = document.body || document.documentElement;
            body.style.position = 'sticky';
            let _style = getComputedStyle(body) || body.currentStyle;
            supportSticky.value = _style.position === 'sticky';
        }
        onMounted(() => {
            testSticky();
        });

        // 改变状态函数
        function changeShow() {
            isShowCode.value = !isShowCode.value;
            if (isShowCode.value) {
                codeBox.value.style.height = props.codeHeight;
                guide.value = '隐藏代码';
            } else {
                codeBox.value.style.height = 0;
                guide.value = '显示代码';
            }
        }
        return {
            isShowCode,
            guide,
            supportSticky,
            codeBox,
            changeShow,
            extendStyle
        }
    }
})
</script>

<style lang='scss' scoped>
.showPart {
    width: 100%;
    border: 0.01rem solid #ccc;
    box-shadow: 0 0 .03rem rgba(0,0,0,.1);
    font-size: 0.16rem;
    .main {
        width: 100%;
        box-sizing: border-box;
        padding: .2rem;
        text-align: left;
        border-bottom: 1px solid #ccc;
        background: rgba(255,255,255, .8);
        overflow: hidden;
    }
    .bottom {
        position: relative;
        padding-bottom: .5rem;
        &.sticky_bottom {
            padding-bottom: 0;
        }
        .code {
            width: 100%;
            height: 0;
            overflow: hidden;
            transition: all .3s ease-out 0s;
            &:hover+.footer {
                .triangle {
                    transform: translate(-0.3rem, -72%) rotate(180deg);
                }
                .guide {
                    opacity: 1;
                    transform: translate(0%, -50%);
                }
            }
        }
        .footer {
            width: 100%;
            height: .5rem;
            background: rgba(255,255,255, .8);
            transition: all .3s ease 0s;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            &.sticky_footer {
                position: sticky;
            }
            .triangle {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -27%);
                width: 0;
                height: 0;
                border: 0.09rem solid transparent;
                border-top-color: #ccc;
                transition: all .3s ease 0s;
            }
            .guide {
                margin: 0;
                padding: 0;
                color: #ccc;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(40%, -50%);
                opacity: 0;
                transition: all .3s ease 0s;
            }
            &:hover {
                background: rgba(243, 243, 243, 0.808);
                .triangle {
                    border-top-color: #3A9CDB;
                    transform: translate(-0.3rem, -27%);
                }
                .guide {
                    opacity: 1 !important;
                    transform: translate(0%, -50%);
                    color: #3A9CDB;
                }
            }
            &.activeFooter {
                border-top: 1px solid #ccc;
                .triangle {
                    transform: translate(-50%, -72%) rotate(180deg);
                }
                &:hover {
                    .triangle {
                        transform: translate(-0.3rem, -72%) rotate(180deg);
                    }
                }
            }
        }
    }
    
}
</style>