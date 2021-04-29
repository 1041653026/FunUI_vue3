<template>
    <div class='select'>
        <div class="select-title">
            <Title size='small'>
                下拉框Select
                <template v-slot:descript>当选项过多时，可以用下拉框选择器，他的背景图片可以改变为你想要的图片。</template>
            </Title>
        </div>
        <div class="select-main">
            <Show codeHeight='1200px'>
                <template v-slot:main class='show-main'>我要展示select的样式</template>
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

export default {
    name: 'SelectPage',
    components: {
        Title,
        Show
    },
    methods: {

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
        .show-main {

        }
        .show-code {
            height: 300px;
        }
    }
}
</style>
