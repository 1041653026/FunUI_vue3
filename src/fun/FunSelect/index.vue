<template>
    <div class='select-outer'
        ref='selectMain'
        @click='open'
        :style="{
            width: compareType(width, 'String') ? width : width + 'px',
            height: compareType(height, 'String') ? height : height + 'px',
            fontSize: compareType(fontSize, 'String') ? fontSize : fontSize + 'px',
            ...style
        }"
    >
        <div class="select-bg"></div>
        <div class="select-outer-box">
            <div :class='{"select-main": true, selectDisabled: disabled}'>
                <input
                    class='filter-input'
                    type='text'
                    :readonly='!filter'
                    :placeholder="placeholder"
                    :value='myValue'
                    :disabled='disabled'
                    @input='changeVal'
                >
                <i v-if='filter' class='select-filter-clear' v-show='!disabled' @click='selectClear'>×</i>
            </div>
            <div
                :class='{
                    "select-triangle": true,
                    triangleDisabled: disabled, "active-triangle": !disabled && active
                }'
            >
                <span class='triangle-inner'></span>
            </div>
            <div class='select-options' data-val='dont_touch_me' :style='{height: active ? "180px" : 0, opacity: active ? 1 : 0}' @click='mySelect'>
                <div v-for='(item, i) in myList' :key='i' @click.stop.prevent='chooseItem(item)'>{{item.label}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, triggerRef } from 'vue';
import { testType, compareType } from '../utils/index';
import { useControlOpen } from './hooks';
/***
 * @placeholder  占位文字
 * @width        组件宽度
 * @height       组件高度
 * @fontSize     字体大小
 * @style        扩展整体样式
 * @defaultValue 默认选定的值
 * @ListData     选择器数据[{label: '', value: ''}]
 * @onSelect     选择方法
 * @filter       是否支持模糊匹配
 * @disabled     是否禁止选择
 */
export default {
    name: 'FunSelect',
    props: {
        placeholder: {
            type: String,
            default: '点击选择选项'
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: 50
        },
        fontSize: {
            type: [String, Number],
            default: 16
        },
        style: {
            type: Object,
            default: {}
        },
        modelValue: {
            type: [Array, String, Number, Boolean, Object],
            default: ''
        },
        listData: {
            type: Array,
            default: () => []
        },
        filter: {
            type: Boolean,
            default: false
        },
        onSelect: {
            type: Function,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const myValue = ref('路飞');
        // 打开下拉框hooks
        const { active, open } = useControlOpen();
        // 修改input输入框的值
        function changeVal(e) {
            // ctx.emit('update:modelValue', e.target.value);
            myValue.value = e.target.value;
        }
        // 选择选项
        function chooseItem(item) {
            myValue.value = item.label;
            ctx.emit('update:modelValue', item.value);
            open();
        }
        
        return {
            myValue,
            active,
            open,
            changeVal,
            compareType,
            chooseItem
        }
    },
    data() {
        return {
            filterVal: '',                        // 模糊匹配的值     
            myList: []                            // 列表数据
        }
    },
    created() {
        this.getDefaultValue();
        document.addEventListener('click', this.docClick, true);
    },
    beforeUnmount () {
        document.removeEventListener('click', this.docClick);
    },
    methods: {
        getDefaultValue() {
            let defaultValue;
            this.listData && this.listData.forEach(item => {
                if (item.value == this.defaultValue) {
                    defaultValue = item.label;
                }
            });
            if (!defaultValue) {
                defaultValue = this.defaultValue ? this.defaultValue : '点击选择选项';
            }
            this.myValue = defaultValue;
            this.myList = this.listData;
        },
        docClick(e) {
            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i] === this.$refs.selectMain) {
                    return;
                }
            }
            if (e.target === this.$refs.selectMain) return;
            if (this.filter && this.active) return;
            this.active = false;
        },
        mySelect(e) {
            let val = e.target.getAttribute('data-val');
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            if (val === 'dont_touch_me') {
                this.active = false;
                return;
            }
            this.myValue = e.target.innerHTML;
            this.onSelect(val);
            if (this.filter) {
                this.active = false;
            }
        },
        myFilter(e) {
            this.filterVal = e.target.value;
            this.myValue = e.target.value;
            console.log(e.target.value)
        },
        selectClear() {
            if (this.disabled) return;
            this.myValue = '';
            this.filterVal = '';
        }
    },
    watch: {
        filterVal() {
            let listData;
            if (this.filter) {
                listData = this.listData.filter(item => {
                    return (item.label + '').indexOf(this.filterVal) > -1;
                });
            }
            if (!listData.length) {
                listData = [];
            }
            this.myList = listData;
        },
        // 数据列表listData和defaultValue应联动变化，如果只是数据列表变化defaultValue不会跟着变化
        listData() {
            this.getDefaultValue();
        }
    }
}
</script>

<style lang="scss" scoped>
.select-outer {
    width: 100%;
    height: 50px;
    position: relative;
    font-size: 16px;
    &:hover {
        .select-main {
            .select-filter-clear {
                opacity: 1 !important;
            }
        }
    }
    .select-bg {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-image: url("./images/kuang.png") 60 stretch;
        border-color: red;
        border-style: solid;
        border-width: 10px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        pointer-events: none;
    }
    .select-outer-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        transition: all .3s linear 0s;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        .select-main {
            flex: 1;
            box-sizing: border-box;
            padding-left: 2%;
            font-weight: 300;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
            .filter-input {
                width: 100%;
                height: 100%;
                line-height: 100%;
                color: #000;
                background:none;  
                outline:none;  
                border:none;
                min-width: 0;
                cursor: pointer;
                &:focus {
                    border:none;
                }
            }
            .select-filter-clear {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-style: normal;
                border-radius: 50%;
                font-weight: 300;
                box-sizing: border-box;
                background-color: rgba(54, 123, 167, 0.5);
                color: #000;
                position: absolute;
                right: 5px;
                top: 13.5px;
                z-index: 20;
                transition: all .5s linear 0s;
                opacity: 0;
                &:hover {
                    background-color: rgba(58, 156, 219, 1);
                }
            }
            &.selectDisabled {
                background: rgba(150,150,150,.3);
                cursor: not-allowed;
                .filter-input {
                    cursor: not-allowed;
                }
            }
        }
        .select-triangle {
            width: 29px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(54, 123, 167, 0.5);
            .triangle-inner {
                transform: translateY(10px);
                border: 10px solid transparent;
                border-top-color: rgba(58, 156, 219, 1);
                transform-origin: 10px 5px;
                transition: all .2s linear 0s;
            }
            &.active-triangle {
                .triangle-inner {
                    transform: translateY(10px) rotate(180deg);
                }
            }
            &.triangleDisabled {
                cursor: not-allowed;
            }
        }
        .select-options {
            position: absolute;
            top: 101%;
            left: 0;
            width: 100%;
            height: 0;
            transition: all .3s ease 0s;
            box-sizing: border-box;
            text-align: left;
            overflow: auto;
            // background: url('./option_bg.png') no-repeat;
            // background-size: 100% 100%;
            box-sizing: border-box;
            border: 1px solid rgba(0, 159, 232, 1);
            background-color: rgba(0, 159, 232, 0.5);
            z-index: 400;
            /* 去滚动条兼容 */
            scrollbar-width: none;
            -ms-scroll-chaining: chained;
            -ms-overflow-style: none;
            -ms-content-zooming: zoom;
            -ms-scroll-rails: none;
            -ms-content-zoom-limit-min: 100%;
            -ms-content-zoom-limit-max: 500%;
            -ms-scroll-snap-type: proximity;
            -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
            -ms-overflow-style: none;
            /* webkit内核浏览器去滚动条 */
            &::-webkit-scrollbar {
                display:none;
                width: 0;
                opacity: 0;
            }
            &::before {
                content: '';
                display: block;
                width: 100%;
                height: 0.2rem;
            }
            div {
                width: 100%;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                padding-left: 16px;
                font-weight: 300;
                &:hover {
                    background-color: rgba(17, 80, 156, 0.5);
                }
            }
        }
    }
    
}
</style>