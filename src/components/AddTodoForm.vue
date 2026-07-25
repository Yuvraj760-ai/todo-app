<script setup>
import { ref } from 'vue'
import { PlusCircle, Dumbbell, Sparkles, Flame, Heart, Bike, Footprints } from 'lucide-vue-next'

const emit = defineEmits(['add'])
const text = ref('')
const inputRef = ref(null)

const quickPills = [
  { label: '30m Jogging', icon: Footprints },
  { label: '20 Push-ups', icon: Dumbbell },
  { label: '15m Yoga Flow', icon: Heart },
  { label: '45m Cycling', icon: Bike },
  { label: 'HIIT Cardio', icon: Flame }
]

function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('add', trimmed)
  text.value = ''
  inputRef.value?.focus()
}

function selectPill(suggestion) {
  text.value = suggestion
  submit()
}
</script>

<template>
  <div class="add-form-container">
    <form class="add-form" @submit.prevent="submit">
      <div class="input-wrapper">
        <div class="input-icon-box">
          <Dumbbell class="input-icon animate-icon-pop icon-delay-1" :size="20" />
        </div>
        <input
          ref="inputRef"
          v-model="text"
          class="add-input"
          type="text"
          placeholder="Enter exercise (e.g., 30m Jogging, 20 Push-ups)..."
          maxlength="120"
        />
      </div>

      <button
        class="add-btn"
        :disabled="!text.trim()"
        type="submit"
      >
        <PlusCircle class="btn-icon animate-icon-spin" :size="18" />
        <span>Add Exercise</span>
      </button>
    </form>

    <!-- Quick Preset Chips -->
    <div class="quick-presets">
      <span class="preset-label">
        <Sparkles class="preset-label-icon animate-icon-spin icon-delay-2" :size="13" />
        Quick Add:
      </span>
      <div class="preset-chips">
        <button
          v-for="(pill, index) in quickPills"
          :key="pill.label"
          class="chip-btn"
          type="button"
          @click="selectPill(pill.label)"
        >
          <component :is="pill.icon" class="chip-icon animate-icon-pop" :class="`icon-delay-${(index % 3) + 1}`" :size="14" />
          <span>{{ pill.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-form-container {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-form {
  display: flex;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 4px 6px 4px 14px;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.input-wrapper:focus-within {
  border-color: var(--emerald-500);
  background: var(--card-hover);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2), 0 8px 24px rgba(0, 0, 0, 0.25);
}

.input-icon-box {
  color: var(--emerald-400);
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.add-input {
  flex: 1;
  padding: 12px 0;
  background: transparent;
  color: var(--text-main);
  font-size: 0.95rem;
  font-weight: 500;
}

.add-input::placeholder {
  color: var(--text-dim);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  background: linear-gradient(135deg, var(--emerald-500), var(--emerald-600));
  color: #0d1520;
  font-weight: 800;
  font-size: 0.92rem;
  border-radius: var(--radius-md);
  transition: var(--transition);
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

.add-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--emerald-400), var(--teal-400));
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(0.6);
  box-shadow: none;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.add-btn:hover:not(:disabled) .btn-icon {
  transform: rotate(90deg) scale(1.15);
}

/* Quick Presets */
.quick-presets {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.preset-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preset-label-icon {
  color: var(--cyan-400);
}

.preset-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  transition: var(--transition);
}

.chip-btn:hover {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: var(--emerald-400);
  transform: translateY(-2px);
}

.chip-icon {
  color: var(--emerald-400);
}
</style>
