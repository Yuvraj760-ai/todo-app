<script setup>
import { useTodos } from './composables/useTodos.js'
import Sidebar from './components/Sidebar.vue'
import AddTodoForm from './components/AddTodoForm.vue'
import TodoList from './components/TodoList.vue'
import { Activity, Zap, Sparkles, Trophy } from 'lucide-vue-next'

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
      <!-- Main Content Header with Moving Entrance Icons -->
      <header class="main-header">
        <div class="header-badge icon-hover-float">
          <Zap class="header-badge-icon animate-icon-pop icon-delay-1" :size="16" />
          <span>DAILY WORKOUT TRACKER</span>
        </div>
        <div class="title-row">
          <h1 class="main-title">Exercise Tracker</h1>
          <Sparkles class="title-sparkle animate-icon-spin icon-delay-2" :size="24" />
        </div>
        <p class="main-subtitle">
          Log your daily exercises, maintain your streak momentum, and achieve your workout goals.
        </p>
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
  max-width: 840px;
  margin: 0 auto;
  padding: 45px 36px 90px;
  width: 100%;
}

.main-header {
  margin-bottom: 36px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 20px;
  color: var(--emerald-400);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.header-badge-icon {
  color: var(--emerald-400);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-title {
  font-size: 2.3rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.8px;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-sparkle {
  color: var(--cyan-400);
}

.main-subtitle {
  color: var(--text-muted);
  margin-top: 8px;
  font-size: 0.98rem;
  line-height: 1.5;
  max-width: 580px;
}

@media (max-width: 900px) {
  .app-layout {
    flex-direction: column;
  }
  .main-content {
    padding: 24px 20px 60px;
  }
}
</style>
