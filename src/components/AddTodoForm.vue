<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const text = ref('')
const inputRef = ref(null)

function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('add', trimmed)
  text.value = ''
  inputRef.value?.focus()
}
</script>

<template>
  <form class="add-form" @submit.prevent="submit">
    <input
      ref="inputRef"
      v-model="text"
      class="add-input"
      type="text"
      placeholder="e.g. 30 min jogging, yoga, push-ups..."
      maxlength="120"
    />
    <button
      class="add-btn"
      :disabled="!text.trim()"
      type="submit"
    >
      Add Exercise
    </button>
  </form>
</template>

<style scoped>
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}

.add-input {
  flex: 1;
  padding: 14px 18px;
  background: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius);
  font-size: 0.95rem;
  color: var(--gray-800);
  transition: var(--transition);
}

.add-input:focus {
  border-color: var(--green-500);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
}

.add-input::placeholder {
  color: var(--gray-400);
}

.add-btn {
  padding: 14px 24px;
  background: var(--green-600);
  color: var(--white);
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: var(--radius);
  transition: var(--transition);
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  background: var(--green-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
