import { ref } from 'vue';
export function useCodeTemp() {
    const code1 = ref(`
        <template>
            <div>
                123
            </div>
        </template>
    `)
    return {
        code1
    }
}