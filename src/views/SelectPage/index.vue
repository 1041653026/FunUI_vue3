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
                        <fun-select></fun-select>
                    </div>
                </template>
                <template v-slot:code class='show-code'>我要写select的代码</template>
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

export default {
    name: 'SelectPage',
    components: {
        Title,
        Show,
        FunSelect
    },
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
            height: 2.5rem;
        }
        .show-code {
            height: 300px;
        }
    }
}
</style>
