<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    isCorrect: boolean;
    message: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);
const visible = ref(true);

const closeMessage = () => {
    visible.value = false;
    emit('close');
};

// Watch props if necessary for reactive behavior
watch(() => props.message, (newMessage) => {
    if (newMessage) {
        visible.value = true;
    }
});
</script>

<template>
    <div v-if="visible" class="feedback-message-wrapper" @click="closeMessage">
        <div class="feedback-message" :class="isCorrect ? 'success' : 'error'" @click.stop>
            <p>{{ message }}.</p>
        </div>
    </div>
</template>

<style>
.feedback-message-wrapper {
    position: fixed;
    top: -45%;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.feedback-message {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feedback-message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.feedback-message.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>
