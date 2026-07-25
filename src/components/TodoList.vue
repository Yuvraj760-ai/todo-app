<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: Array
})

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="todo-list-wrapper">
    <TransitionGroup
      name="list"
      tag="div"
      class="todo-list"
    >
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', todo.id)"
        @remove="emit('remove', todo.id)"
      />
    </TransitionGroup>

    <div v-if="todos.length === 0" class="empty-state">
      <div class="empty-icon">🏋️</div>
      <p class="empty-title">No exercises logged yet</p>
      <p class="empty-desc">Add your first exercise above to start tracking!</p>
    </div>
  </div>
</template>

<style scoped>
.todo-list-wrapper {
  position: relative;
}

.todo-list {
  position: relative;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  animation: fadeInUp 0.5s ease;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray-600);
  margin-bottom: 6px;
}

.empty-desc {
  font-size: 0.9rem;
  color: var(--gray-400);
}
</style>
