<script setup>
import { computed } from 'vue'
import {
  Check,
  Trash2,
  Dumbbell,
  Footprints,
  Bike,
  Heart,
  Flame,
  Zap,
  Clock,
  Sparkles
} from 'lucide-vue-next'

const props = defineProps({
  todo: Object
})

const emit = defineEmits(['toggle', 'remove'])

// Determine dynamic workout icon based on task text keyword
const exerciseIcon = computed(() => {
  const t = (props.todo.text || '').toLowerCase()
  if (t.includes('run') || t.includes('jog') || t.includes('walk') || t.includes('step')) return Footprints
  if (t.includes('bike') || t.includes('cycl') || t.includes('ride')) return Bike
  if (t.includes('yoga') || t.includes('stretch') || t.includes('meditat') || t.includes('heart')) return Heart
  if (t.includes('hiit') || t.includes('cardio') || t.includes('burn') || t.includes('fire')) return Flame
  if (t.includes('push') || t.includes('lift') || t.includes('weight') || t.includes('dumb') || t.includes('gym')) return Dumbbell
  return Zap
})

const exerciseColorClass = computed(() => {
  const t = (props.todo.text || '').toLowerCase()
  if (t.includes('run') || t.includes('jog')) return 'icon-emerald'
  if (t.includes('bike') || t.includes('cycl')) return 'icon-cyan'
  if (t.includes('yoga')) return 'icon-purple'
  if (t.includes('hiit') || t.includes('cardio')) return 'icon-orange'
  return 'icon-teal'
})

const formattedDate = computed(() => {
  if (!props.todo.createdAt) return 'Today'
  return new Date(props.todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <!-- Animated Checkbox -->
    <button
      class="todo-check-btn"
      :class="{ checked: todo.completed }"
      type="button"
      @click="emit('toggle')"
      :aria-label="todo.completed ? 'Mark incomplete' : 'Mark complete'"
    >
      <div class="check-box">
        <Check v-if="todo.completed" class="check-icon animate-icon-pop" :size="15" />
      </div>
    </button>

    <!-- Moving Entrance Exercise Icon -->
    <div class="exercise-icon-badge" :class="[exerciseColorClass, 'icon-hover-float']">
      <component
        :is="exerciseIcon"
        class="exercise-icon animate-icon-spin icon-delay-1"
        :size="20"
      />
    </div>

    <!-- Todo Content -->
    <div class="todo-body">
      <span class="todo-text">{{ todo.text }}</span>
      <div class="todo-meta">
        <Clock class="meta-icon animate-icon-slide icon-delay-2" :size="12" />
        <span class="todo-date">{{ formattedDate }}</span>
        <span v-if="todo.completed" class="completed-tag">
          <Sparkles class="tag-icon animate-icon-pop" :size="11" /> Done
        </span>
      </div>
    </div>

    <!-- Animated Delete Button -->
    <button
      class="todo-delete-btn icon-hover-float"
      @click="emit('remove')"
      title="Delete exercise"
    >
      <Trash2 class="delete-icon animate-icon-pop icon-delay-2" :size="17" />
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--emerald-500);
}

.todo-item:hover {
  background: var(--card-hover);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.todo-item.completed {
  border-left-color: var(--teal-400);
  opacity: 0.82;
  background: rgba(16, 24, 34, 0.45);
}

/* Checkbox button */
.todo-check-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.check-box {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  background: rgba(0, 0, 0, 0.2);
}

.todo-check-btn:hover .check-box {
  border-color: var(--emerald-400);
  background: rgba(16, 185, 129, 0.15);
}

.todo-check-btn.checked .check-box {
  background: linear-gradient(135deg, var(--emerald-500), var(--teal-400));
  border-color: var(--emerald-400);
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
}

.check-icon {
  color: #0d1520;
  stroke-width: 3;
}

/* Exercise Icon Badge */
.exercise-icon-badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.icon-emerald { background: rgba(16, 185, 129, 0.15); color: var(--emerald-400); border: 1px solid rgba(16, 185, 129, 0.2); }
.icon-cyan { background: rgba(34, 211, 238, 0.15); color: var(--cyan-400); border: 1px solid rgba(34, 211, 238, 0.2); }
.icon-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.2); }
.icon-orange { background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.2); }
.icon-teal { background: rgba(45, 212, 191, 0.15); color: var(--teal-400); border: 1px solid rgba(45, 212, 191, 0.2); }

/* Body Content */
.todo-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.todo-text {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  transition: var(--transition);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-dim);
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  color: var(--text-dim);
}

.meta-icon {
  color: var(--text-muted);
}

.completed-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  background: rgba(16, 185, 129, 0.15);
  color: var(--emerald-400);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
}

.tag-icon {
  color: var(--emerald-400);
}

/* Delete Button */
.todo-delete-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  transition: var(--transition);
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.03);
}

.todo-delete-btn:hover {
  background: rgba(248, 113, 113, 0.18);
  color: var(--red-400);
  border-color: rgba(248, 113, 113, 0.3);
}

.todo-delete-btn:hover .delete-icon {
  animation: iconEntrySpinPop 0.4s ease;
}
</style>
