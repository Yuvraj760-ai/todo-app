<script setup>
import { useTodos } from './composables/useTodos.js'
import Sidebar from './components/Sidebar.vue'
import AddTodoForm from './components/AddTodoForm.vue'
import TodoList from './components/TodoList.vue'

const {
  todos,
  totalCount,
  completedCount,
  completedToday,
  currentStreak,
  recentActivity,
  addTodo,
  toggleTodo,
  removeTodo
} = useTodos()
</script>

<template>
  <div class="app-layout">
    <Sidebar
      :totalCount="totalCount"
      :completedCount="completedCount"
      :completedToday="completedToday"
      :currentStreak="currentStreak"
      :recentActivity="recentActivity"
    />
    <main class="main-content">
      <header class="main-header">
        <h1 class="main-title">Exercise Tracker</h1>
        <p class="main-subtitle">Log your daily workouts and stay consistent</p>
      </header>
      <AddTodoForm @add="addTodo" />
      <TodoList
        :todos="todos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  width: 100%;
}

.main-header {
  margin-bottom: 32px;
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--green-800);
  letter-spacing: -0.5px;
}

.main-subtitle {
  color: var(--gray-500);
  margin-top: 4px;
  font-size: 0.95rem;
}
</style>
