<template>
<div class="funNav flexRow">
    <div class='outer' v-if='list.length'>
        <div v-for='(item, i) in list' :key='i' class="item-outer" @click='jump(item.route)'>
            <div :class="{item: true, active: active === item.route}">{{item.label}}</div>
        </div>
    </div>
</div>
</template>

<script>
/***
 * @list 导航栏数据     Array     [{label: '导航栏名称', route: '跳转地址'}]
 */
import {
    defineComponent,
    ref,
    watchEffect
} from 'vue';
import {
    useRoute,
    useRouter
} from 'vue-router'
export default defineComponent({
    name: 'FunNav',
    props:{
        list: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const active = ref('');
        const route = useRoute();
        const router = useRouter();
        active.value = route.path;
        const jump = (cur) => {
            active.value = cur;
            router.push(cur);
        }
        watchEffect(() => {
            active.value = route.path;
        })
        return {
            list: props.list || [],
            active,
            jump
        }
    },
})
</script>

<style lang='scss' scoped>
.funNav {
    width: 100%;
    height: 100%;

    .outer {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 2vh;
        // overflow: hidden;
        flex-direction: column;
        justify-content: flex-start;
        color: #fff;

        .item-outer {
            width: 100%;

            // overflow: hidden;
            .item {
                width: 150%;
                height: 3vw;
                transform: translate(-34%);
                margin-bottom: 2vh;
                font-size: 1.5vw;
                text-align: left;
                line-height: 3vw;
                background: url('../../assets/img/nav.png') no-repeat;
                background-size: 100% 100%;
                box-sizing: border-box;
                padding-left: 60%;
                transition: all .3s ease 0s;
                cursor: pointer;
                opacity: .8;

                &:hover {
                    transform: translate(-28%) scale(1.2);
                }

                &.active {
                    transform: translate(-28%) scale(1.2);
                }
            }
        }
    }
}
</style>
