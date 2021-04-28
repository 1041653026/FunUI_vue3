<template>
<div class="snow" :ref='el => snow = el'>
    <canvas class='ctx' :ref='el => ctx = el'>抱歉，您的浏览器暂不支持canvas！请切换到高级浏览器！</canvas>
</div>
</template>

<script>
import snowPic from '../../assets/img/snow.png';
import {
    ref,
    reactive,
    onMounted,
    onBeforeUnmount,
    defineComponent
} from 'vue'
export default defineComponent({
    name: 'Snow',
    setup() {

        /**初始化画布 */
        const ctx = ref(null); // canvas元素
        const _ctx = ref(null); // canvas画笔
        const snow = ref(null); // canvas外层元素
        onMounted(() => {
            _ctx.value = ctx.value.getContext('2d');
            let size = snow.value.getBoundingClientRect();
            ctx.value.width = size.width;
            ctx.value.height = size.height;
        });

        /**雪花渲染程序 */
        const canvas = ref(null); // 雪花离屏canvas存储
        const size = ref(50); // 雪花大小
        const snowList = reactive([]); // 雪花信息列表
        const count = ref(150); // 雪花数量
        let createSnow = (width, height, top) => {
            let data = {
                x: Math.random() * width,
                y: Math.random() * height,
                dir: Math.random() - 0.5 > 0 ? 1 : -1,
                speed: Math.ceil(Math.random() * 3)
            }
            top && (data.y = -size.value);
            _ctx.value.drawImage(canvas.value, 0, 0, canvas.value.width, canvas.value.height, data.x, data.y, size.value, size.value);
            snowList.push(data);
        }
        let initSnow = () => {
            let width = ctx.value.width;
            let height = ctx.value.height;
            size.value = 50 / 1920 * width;
            for (let i = 0; i < count.value; i++) {
                createSnow(width, height);
            }
        }
        const loadImg = () => {
            let _canvas = document.createElement('canvas');
            let cvs = _canvas.getContext('2d');
            let img = new Image();
            img.src = snowPic;
            img.onload = () => {
                _canvas.width = img.width;
                _canvas.height = img.height;
                cvs.drawImage(img, 0, 0, _canvas.width, _canvas.height);
                canvas.value = _canvas;
                initSnow();
            }
        }
        onMounted(() => {
            loadImg();
        });

        /**画布resize程序 */
        const changeCanvas = () => {
            let RATIO, _body = document.body || document.documentElement;
            if (_body.clientWidth / 1920 > _body.clientHeight / 1080) {
                RATIO = _body.clientHeight / 1080;
            } else {
                RATIO = _body.clientWidth / 1920;
            }
            ctx.value.width = _body.clientWidth;
            ctx.value.height = _body.clientHeight;
            size.value = 50 * RATIO;
        }
        onMounted(() => {
            window.addEventListener('resize', changeCanvas);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', changeCanvas);
        })

        /**雪花运动程序 */
        const timer = ref(null); // 定时器
        const num = ref(0); // 计数器
        const play = () => {
            _ctx.value.clearRect(0, 0, ctx.value.width, ctx.value.height);
            num.value++;
            snowList.forEach((item, i) => {
                item.x = item.x + item.speed * Math.sin((num.value + i * 2) / 100) * item.dir;
                item.y = item.y + item.speed;
                if (item.x > ctx.value.width || item.x < -size.value) {
                    snowList.splice(i, 1);
                    createSnow(ctx.value.width, ctx.value.height, true);
                }
                if (item.y > ctx.value.height) {
                    snowList.splice(i, 1);
                    createSnow(ctx.value.width, ctx.value.height, true);
                }
                _ctx.value.drawImage(canvas.value, 0, 0, canvas.value.width, canvas.value.height, item.x, item.y, size.value, size.value);
            })
        }
        const keepChange = () => {
            timer.value = setInterval(() => {
                play();
            }, 35);
        }
        const breakKeepChange = () => {
            clearInterval(timer.value);
            timer.value = null;
        }
        onMounted(() => {
            keepChange();
        });
        onBeforeUnmount(() => {
            breakKeepChange();
        })

        return {
            ctx,
            snow
        }
    },
})
</script>

<style lang="scss" scoped>
.snow {
    width: 100%;
    height: 100%;
    pointer-events: none;

    .ctx {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
}
</style>
