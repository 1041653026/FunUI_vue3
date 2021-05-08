import { ref } from 'vue';

export function useControlOpen() {
    const active = ref(false);
    function open() {
        active.value = !active.value;
    }
    return {
        active,
        open
    }
}