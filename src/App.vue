<template>
<div id="app" class='flexRow'>
    <div class="bg">
        <Background></Background>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>
    <div class="snow">
        <Snow></Snow>
    </div>
</div>
</template>

<script>
import Background from './components/Background/index.vue';
import Snow from './components/Snow/index.vue';
import {
    onBeforeUnmount, readonly
} from 'vue';

export default {
    name: 'App',
    components: {
        Background,
        Snow
    },
    beforeCreate() {
        console.log(1111111111111);
    },
    created() {
        console.log(2222222222222);
    },
    setup(props, context) {
        console.log(333333333333, this, props, context);
        const resize = () => {
            let RATIO, _body = document.body || document.documentElement;
            if (_body.clientWidth / 1920 > _body.clientHeight / 1080) {
                RATIO = _body.clientHeight / 1080;
            } else {
                RATIO = _body.clientWidth / 1920;
            }
            document.documentElement.style.fontSize = 100 * RATIO + 'px';
        }
        resize();
        window.addEventListener('resize', resize);
        onBeforeUnmount(() => {
            window.removeEventListener('resize', resize);
        });
    }
}
</script>

<style lang="scss" scoped>
#app {
    width: 100%;
    height: 100%;

    .bg {
        width: 100%;
        height: 100%;
    }

    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .snow {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        padding: 0;
        pointer-events: none;
        z-index: 999999999;
    }
}
</style>
