<template>
<div class="title flexRow" :class='{center: align === "center", right: align === "right", big: size === "big", small: size === "small"}'>
    <div class='title-main'>
        <slot name='default'></slot>
    </div>
    <div class="title-des">
        <slot name="descript"></slot>
    </div>
</div>
</template>

<script>
/***
 *@size      字体大小，默认正常     可选值big/small
 *@align     默认对齐,默认left     可选值left/center/right
 *
 */
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Title',
    props: {
        size: {
            type: String,
            default: ''
        },
        align: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss" scoped>
.title {
    width: 100%;
    height: 100%;
    min-height: .8rem;
    flex-direction: column;
    justify-content: flex-end;
    text-align: left;

    &.center {
        text-align: center;
    }

    &.right {
        text-align: right;
    }

    &.big {
        min-height: 1.0rem;

        .title-main {
            line-height: .7rem;
            font-size: .35rem;
        }

        .title-des {
            font-size: .22rem;
        }
    }

    &.small {
        min-height: .7rem;

        .title-main {
            line-height: .4rem;
            font-size: .25rem;
        }

        .title-des {
            font-size: .16rem;
        }
    }

    .title-main {
        width: 100%;
        font-size: .3rem;
        font-weight: bold;
        color: #48b5f8;
        line-height: .5rem;
    }

    .title-des {
        width: 100%;
        font-size: .18rem;
        line-height: .3rem;
        color: #383535cc;
    }
}
</style>
