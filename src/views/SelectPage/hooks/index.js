import { ref } from 'vue';
export function useCodeTemp() {     
    const code1 = ref(
`<template>
    <fun-select 
    v-model="value"
    :listData="options"
    :width="300"
    >
    </fun-select>
</template>
<script>
    export default {
        data() {
            return {
                options: [{
                    label: "路飞",
                    value: 1
                }, {
                    label: "索隆",
                    value: 2
                }, {
                    label: "娜美",
                    value: 3
                }, {
                    label: "香吉士",
                    value: 4
                }, {
                    label: "乌索普",
                    value: 5
                }, {
                    label: "乔巴",
                    value: 6
                }, {
                    label: "妮可罗宾",
                    value: 7
                }, {
                    label: "弗兰奇",
                    value: 8
                }, {
                    label: "甚平",
                    value: 9
                }],
                value: ""
            }
        }
    }
</script>`
    );
    const code2 = ref(
`<template>
    <fun-select 
    v-model="value"
    :listData="options"
    :width="300"
    >
    </fun-select>
</template>
<script>
    export default {
        data() {
            return {
                options: [{
                    label: "选项一",
                    value: "选项一"
                }, {
                    label: "选项二",
                    value: "选项二"
                }, {
                    label: "选项三",
                    value: "选项三",
                    disabled: true
                }, {
                    label: "选项四",
                    value: "选项四"
                }],
                value: ""
            }
        }
    }
</script>`
    );
    return {
        code1,
        code2
    }
}
