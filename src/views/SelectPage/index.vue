<template>
    <div class='select'>
        <div class="select-title">
            <Title size='small'>
                下拉框Select
                <template v-slot:descript>当选项过多时，使用下拉框选择器选择内容。</template>
            </Title>
        </div>
        <div class="select-main">
            <Show codeHeight='1200px' :style='{marginBottom: "0.5rem"}'>
                <template v-slot:main class='show-main'>
                    <div class="select-show">
                        <fun-select 
                            v-model="test"
                            :listData='testList'
                            width='3rem'
                        >
                        </fun-select>
                    </div>
                </template>
                <template v-slot:code class='show-code'>
                    <div class='code-show' v-highlight>
                        <pre>
                            <code>
                                {{code1}}
                            </code>
                        </pre>
                    </div>
                </template>
            </Show>
            <Show codeHeight='1200px'>
                <template v-slot:main class='show-main'>我要展示select的样式</template>
                <template v-slot:code class='show-code'>我要写select的代码</template>
            </Show>
            <Show codeHeight='1200px'>
                <template v-slot:main class='show-main'>我要展示select的样式</template>
                <template v-slot:code class='show-code'>我要写select的代码</template>
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
        const test = ref(null);
        const testList = reactive([{
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
        const { code1 } = useCodeTemp();
        watchEffect(() => {
            console.log(test.value)
        });
        return {
            test,
            testList,
            code1
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