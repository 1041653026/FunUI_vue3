<template>
<div class="bg">
    <canvas class='ctx' :ref='el => canvas = el'>抱歉，您的浏览器暂不支持canvas！请切换到高级浏览器！</canvas>
</div>
</template>

<script>
import bg1 from './Image/1.jpg';
import bg2 from './Image/2.jpg';
import bg3 from './Image/3.jpg';
import bg4 from './Image/4.jpg';
import bg5 from './Image/5.jpg';
import bg6 from './Image/6.jpg';
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    onBeforeUnmount
} from 'vue';

export default defineComponent({
    name: 'Background',
    setup() {
        /**初始化canvas程序 */
        const canvas = ref(null); // canvas画布
        const ctx = ref(null); // canvas画笔
        onMounted(() => {
            ctx.value = canvas.value.getContext('2d');
        });

        /**画背景图程序 */
        const bgArr = [bg1, bg2, bg3, bg4, bg5, bg6]; // 背景图名称列表
        const curImg = ref(0); // 此时展示的背景图
        const history = reactive([]); // 背景图离屏canvas缓存列表
        const drawImg = (img, width, height) => {
            ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
            try {
                canvas.value.width = width;
                canvas.value.height = height;
                ctx.value.drawImage(img, 0, 0, width, height);
                curImg.value++;
            } catch (e) {
                console.log(e);
            }
        }
        const loadImg = () => {
            if (history.length < bgArr.length) {
                let _canvas = document.createElement('canvas');
                let cvs = _canvas.getContext('2d');
                let img = new Image();
                img.src = bgArr[curImg.value % bgArr.length];
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    _canvas.width = width;
                    _canvas.height = height;
                    cvs.drawImage(img, 0, 0, width, height);
                    history.push({
                        content: _canvas,
                        width,
                        height
                    });

                    drawImg(_canvas, width, height);
                }
            } else {
                let curData = history[curImg.value % bgArr.length];
                drawImg(curData.content, curData.width, curData.height);
            }
        }
        onMounted(() => {
            loadImg();
        });

        /**背景图片切换程序 */
        const timer = ref(null);
        const keepChange = () => {
            timer.value = setInterval(() => {
                loadImg();
            }, 10000);
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
        });
        return {
            canvas
        }
    }
    // data() {
    //     return {
    //         ctx: null,
    //         curImg: 0,
    //         timer: null,
    //         history: []
    //     }
    // },
    // mounted() {
    //     this.keepChange();
    // },
    // beforeDestroy() {
    //     this.breakKeepChange();
    // },
    // methods: {
    //     keepChange() {
    //         this.timer = setInterval(() => {
    //             this.loadImg();
    //         }, 10000);
    //     },
    //     breakKeepChange() {
    //         clearInterval(this.timer);
    //         this.timer = null;
    //     }
    // }
})
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    opacity: .5;

    .ctx {
        width: 100%;
        height: 100%;
    }
}
</style>
