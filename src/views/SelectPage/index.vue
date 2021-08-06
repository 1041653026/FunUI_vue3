<template>
    <div class='select'>
        <div class="select-title">
            <Title size='small'>
                下拉框Select
                <template v-slot:descript>当选项过多时，使用下拉框选择器选择内容。</template>
            </Title>
        </div>
        <div class="select-main">
            <div class="select-title-sub">
                <Title size='small' color='#868686'>
                    基础用法
                </Title>
            </div>
            <Show codeHeight='12rem' :style='{marginBottom: "0.2rem"}'>
                <template v-slot:main class='show-main'>
                    <div class="select-show">
                        <fun-select 
                            v-model="value1"
                            :listData='options1'
                            width='3rem'
                        >
                        </fun-select>
                    </div>
                </template>
                <template v-slot:code class='show-code'>
                    <div class='code-show' v-highlight>
                        <code class='html'>
                            {{code1}}
                        </code>
                    </div>
                </template>
            </Show>
            <div class="select-title-sub">
                <Title size='small' color='#868686'>
                    有禁用项
                </Title>
            </div>
            <Show codeHeight='8.5rem' :style='{marginBottom: "0.2rem"}'>
                <template v-slot:main class='show-main'>
                    <div class="select-show">
                        <fun-select 
                            v-model="value2"
                            :listData='options2'
                            width='3rem'
                        >
                        </fun-select>
                    </div>
                </template>
                <template v-slot:code class='show-code'>
                    <div class='code-show' v-highlight>
                        <code class='html'>
                            {{code2}}
                        </code>
                    </div>
                </template>
            </Show>
            <div class="select-title-sub">
                <Title size='small' color='#868686'>
                    禁用状态
                </Title>
            </div>
            <Show codeHeight='8.5rem'>
                <template v-slot:main class='show-main'>
                    <div class="select-show">
                        <fun-select 
                            v-model="value2"
                            :listData='options2'
                            width='3rem'
                            disabled
                        >
                        </fun-select>
                    </div>
                </template>
                <template v-slot:code class='show-code'>
                    <div class='code-show' v-highlight>
                        <code class='html'>
                            {{code2}}
                        </code>
                    </div>
                </template>
            </Show>
        </div>
        
    </div>
</template>

<script>
import Title from '/@/components/Title/index.vue';
import Show from '/@/components/Show/index.vue';
import FunSelect from '/@/fun/FunSelect/index.vue';
import { watchEffect, ref, reactive } from 'vue';
import { useCodeTemp } from './hooks';

export default {
    name: 'SelectPage',
    components: {
        Title,
        Show,
        FunSelect
    },
    setup() {
        const value1 = ref(null);
        const value2 = ref(null);
        const options1 = reactive([{
            label: '路飞',
            value: 1
        }, {
            label: '索隆',
            value: 2
        }, {
            label: '娜美',
            value: 3
        }, {
            label: '香吉士',
            value: 4
        }, {
            label: '乌索普',
            value: 5
        }, {
            label: '乔巴',
            value: 6
        }, {
            label: '妮可罗宾',
            value: 7
        }, {
            label: '弗兰奇',
            value: 8
        }, {
            label: '甚平',
            value: 9
        }]);
        const options2 = reactive([{
            label: '选项一',
            value: '选项一'
        }, {
            label: '选项二',
            value: '选项二'
        }, {
            label: '选项三',
            value: '选项三',
            disabled: true
        }, {
            label: '选项四',
            value: '选项四'
        }]);

        const { code1, code2 } = useCodeTemp();
        watchEffect(() => {
            console.log(value1.value)
        });
        return {
            value1,
            value2,
            options1,
            options2,
            code1,
            code2,
        }
    }
}
</script>

<style lang="scss" scoped>
.select {
    width: 100%;
    height: 100%;
    .select-title {
        width: 100%;
        height: 1.4rem;
    }
    
    .select-main {
        margin-top: .3rem;
        .select-title-sub {
            width: 100%;
            height: 0.7rem;
            margin-bottom: 0.2rem;
        }
        .select-show {
            width: 100%;
            height: 0.5rem;
        }
        .show-code {
            height: 300px;
        }
        .code-show {
            width: 100%;
            height: 100%;
        }
    }
}
</style>