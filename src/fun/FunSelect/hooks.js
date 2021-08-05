import { ref } from 'vue';

export function useControlOpen(isDisabled) {
    const active = ref(false);
    function open() {
        if (isDisabled) return;
        active.value = !active.value;
    }
    return {
        active,
        open
    }
}