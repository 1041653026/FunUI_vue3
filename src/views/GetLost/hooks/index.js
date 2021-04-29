import { onBeforeMount, onMounted, ref } from 'vue';

export function useSpeak(word, box) {
    console.log(word)
    let idx = 0;
    const _tempWord = word.value;
    const len = _tempWord.length - 1;
    const speak = ref('');
    const speakOver = ref(false);
    const timer = ref(null);
    if (box.value) {
        timer.value = setInterval(() => {
            speak.value += _tempWord[idx];
            idx++;
            if (idx > len) {
                clearInterval(timer.value);
                timer.value = null;
                speakOver.value = true;
            }
        }, 200);
    } else {
        onMounted(() => {
            timer.value = setInterval(() => {
                speak.value += _tempWord[idx];
                idx++;
                if (idx > len) {
                    clearInterval(timer.value);
                    timer.value = null;
                    speakOver.value = true;
                }
            }, 200);
        });
        onBeforeMount(() => {
            timer.value && clearInterval(timer.value);
            timer.value = null;
        });
    }
    return {
        speak,
        speakOver
    };
}