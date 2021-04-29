<template>
<div class='summary'>
    <div class="bg">
        <img :src="needImg" alt="">
    </div>
    <div class="para-area" ref='box'>
        <div class='para-main'>{{temp.speak}}</div>
        <div v-if='temp.speakOver' class='jump-btn' @click='findWay'>{{ nextWay == '/summary' ? '我想回去' : 'いくぞ' }}</div>
    </div>
    <img :src="needImg" alt="">
    <div class="error">404</div>
</div>
</template>

<script>
import { watchEffect, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSpeak } from '../hooks';
import img1 from '/@/assets/img/findway/404.png';
import img2 from '/@/assets/img/findway/fw1.png';
import img3 from '/@/assets/img/findway/fw2.jpg';
import img4 from '/@/assets/img/findway/fw3.jpg';
import img5 from '/@/assets/img/findway/fw4.jpg';
export default {
    name: 'FindWay',
    setup() {
        const tempMap = {
            noFound: {
                speak: '喂，乔巴，迷路了么？我带你回去！！！',
                img: img1,
                next: '/findWay/find'
            },
            find: {
                speak: '看来不是这里！',
                img: img2,
                next: '/findWay/findWay'
            },
            findWay: {
                speak: '应该是在另一个方向了！',
                img: img3,
                next: '/findWay/lost'
            },
            lost: {
                speak: '啊！这里是哪啊！',
                img: img4,
                next: '/findWay/cry'
            },
            cry: {
                speak: '路飞，索隆，罗宾！呜~呜~呜~呜~！',
                img: img5,
                next: '/summary'
            }
        }
        const route = useRoute();
        const router = useRouter();

        let temp= reactive({speak: '', speakOver: false}); // 接收speak及speakOver
        let box = ref(null); // 监听元素是否构建完成
        let needSpeak = ref(''); // 需要说的话
        let needImg = ref(null); // 需要展示的图片
        let nextWay = ref(''); // 需要寻找的路径
        watchEffect(() => {
            if (route.params && route.params.type) {
                let type = route.params.type;
                needSpeak.value = tempMap[type].speak;
                needImg.value = tempMap[type].img;
                nextWay.value = tempMap[type].next;
            } else {
                needSpeak.value = tempMap.noFound.speak;
                needImg.value = tempMap.noFound.img;
                nextWay.value = tempMap.noFound.next;
            }
            const {speak, speakOver} = useSpeak(needSpeak, box);
            temp.speak = speak;
            temp.speakOver = speakOver;
        });
        function findWay() {
            router.push(nextWay.value);
        }
        return {
            temp,
            box,
            nextWay,
            needImg,
            findWay
        }
    }
}
</script>

<style lang="scss" scoped>
.summary {
    width: 100%;
    height: 100%;
    position: relative;
    .bg  {
        width: 100%;
        height: 100%;
        filter: blur(30px);
        img {
            width: 100%;
            height: 100%;
        }
    }
    img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        filter: blur(1px);
    }
    .para-area {
        width: 100%;
        height: 1rem;
        position: absolute;
        left: 0;
        top: 1rem;
        font-size: 0.25rem;
        text-align: center;
        color: #fff;
        .para-main {
            margin-bottom: 0.3rem;
        }
        .jump-btn {
            width: 1.5rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.05rem;
            background-color: rgb(58, 156, 219);
            box-shadow: 0.05rem 0rem 0.1rem rgb(58, 156, 219);
            margin-left: 50%;
            transform: translateX(-50%);
            text-align: center;
            cursor: pointer;
        }
    }
    .error {
        font-size: 1.2rem;
        font-weight: bold;
        color: red;
        position: absolute;
        left: 50%;
        bottom: 1rem;
        transform: translateX(-50%);
        text-shadow: .01rem .01rem .01rem rgb(248, 99, 99), .02rem .02rem .01rem rgb(248, 99, 99), .03rem .03rem .01rem rgb(248, 99, 99), .04rem .04rem .01rem rgb(248, 99, 99), .05rem .05rem .01rem rgb(248, 99, 99);
        animation: rotateY 5s linear 0s infinite;
    }
    @keyframes rotateY {
        from {
            transform: translateX(-50%) rotateY(0deg);
        }
        to {
            transform: translateX(-50%) rotateY(360deg);
        }
    }
}
</style>
