<script setup>
defineProps({
  todo: Object
})

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <label class="todo-check">
      <input
        type="checkbox"
        class="todo-checkbox"
        :checked="todo.completed"
        @change="emit('toggle')"
      />
      <span class="check-mark"></span>
    </label>

    <div class="todo-body">
      <span class="todo-text">{{ todo.text }}</span>
      <span class="todo-date">{{ new Date(todo.createdAt).toLocaleDateString() }}</span>
    </div>

    <button class="todo-delete" @click="emit('remove')" title="Delete">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--white);
  border-radius: var(--radius);
  margin-bottom: 10px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border-left: 4px solid transparent;
}

.todo-item:hover {
  box-shadow: var(--shadow-md);
  border-left-color: var(--green-300);
}

.todo-item.completed {
  background: var(--green-50);
  border-left-color: var(--green-500);
}

.todo-check {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.check-mark {
  width: 22px;
  height: 22px;
  border: 2px solid var(--gray-300);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  flex-shrink: 0;
}

.todo-checkbox:checked + .check-mark {
  background: var(--green-500);
  border-color: var(--green-500);
}

.todo-checkbox:checked + .check-mark::after {
  content: '';
  width: 6px;
  height: 10px;
  border: solid var(--white);
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg) translateY(-1px);
}

.todo-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.todo-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--gray-800);
  transition: var(--transition);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--gray-400);
}

.todo-date {
  font-size: 0.72rem;
  color: var(--gray-400);
  font-weight: 500;
}

.todo-delete {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  transition: var(--transition);
  flex-shrink: 0;
}

.todo-delete:hover {
  background: var(--gray-100);
  color: var(--red-400);
}
</style>
