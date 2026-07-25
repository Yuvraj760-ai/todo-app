<script setup>
import { ref, computed } from 'vue'
import { Trophy, ListFilter, Activity, CheckCircle2, Dumbbell, Sparkles } from 'lucide-vue-next'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: Array
})

const emit = defineEmits(['toggle', 'remove'])

const activeFilter = ref('all')

const filteredTodos = computed(() => {
  if (activeFilter.value === 'active') {
    return props.todos.filter(t => !t.completed)
  }
  if (activeFilter.value === 'completed') {
    return props.todos.filter(t => t.completed)
  }
  return props.todos
})

const activeCount = computed(() => props.todos.filter(t => !t.completed).length)
const completedCount = computed(() => props.todos.filter(t => t.completed).length)
</script>

<template>
  <div class="todo-list-wrapper">
    <!-- Filter Toolbar with Moving Entrance Icons -->
    <div v-if="todos.length > 0" class="filter-toolbar">
      <div class="filter-tabs">
        <button
          class="filter-tab"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          <ListFilter class="tab-icon animate-icon-pop icon-delay-1" :size="15" />
          <span>All</span>
          <span class="count-badge">{{ todos.length }}</span>
        </button>

        <button
          class="filter-tab"
          :class="{ active: activeFilter === 'active' }"
          @click="activeFilter = 'active'"
        >
          <Activity class="tab-icon animate-icon-spin icon-delay-2" :size="15" />
          <span>Active</span>
          <span class="count-badge green">{{ activeCount }}</span>
        </button>

        <button
          class="filter-tab"
          :class="{ active: activeFilter === 'completed' }"
          @click="activeFilter = 'completed'"
        >
          <CheckCircle2 class="tab-icon animate-icon-drop icon-delay-3" :size="15" />
          <span>Completed</span>
          <span class="count-badge teal">{{ completedCount }}</span>
        </button>
      </div>

      <div class="list-summary">
        <Sparkles class="summary-icon animate-icon-spin icon-delay-2" :size="14" />
        <span>Showing {{ filteredTodos.length }} exercise{{ filteredTodos.length === 1 ? '' : 's' }}</span>
      </div>
    </div>

    <!-- Todo List Items -->
    <TransitionGroup
      name="list"
      tag="div"
      class="todo-list"
    >
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', todo.id)"
        @remove="emit('remove', todo.id)"
      />
    </TransitionGroup>

    <!-- Fancy Animated Empty State -->
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <div class="empty-icon-glow icon-hover-float">
        <component
          :is="todos.length === 0 ? Dumbbell : Trophy"
          class="empty-main-icon animate-icon-pop icon-delay-1"
          :size="48"
        />
      </div>
      <p class="empty-title">
        {{ todos.length === 0 ? 'No exercises logged yet' : 'No matching exercises found' }}
      </p>
      <p class="empty-desc">
        {{ todos.length === 0 ? 'Add your first workout above to kickstart your daily streak!' : 'Try switching filter tabs or adding new exercises.' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.todo-list-wrapper {
  position: relative;
}

/* Filter Toolbar */
.filter-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--card-border);
  padding: 4px;
  border-radius: var(--radius-md);
  gap: 4px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 0.84rem;
  font-weight: 700;
  transition: var(--transition);
}

.filter-tab:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.filter-tab.active {
  background: var(--card-hover);
  color: var(--emerald-400);
  border: 1px solid rgba(16, 185, 129, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tab-icon {
  color: inherit;
}

.count-badge {
  font-size: 0.72rem;
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
}

.count-badge.green { background: rgba(16, 185, 129, 0.2); color: var(--emerald-400); }
.count-badge.teal { background: rgba(45, 212, 191, 0.2); color: var(--teal-400); }

.list-summary {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-dim);
  font-weight: 600;
}

.summary-icon {
  color: var(--cyan-400);
}

.todo-list {
  position: relative;
  min-height: 100px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--card-bg);
  border: 1px dashed var(--card-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.empty-icon-glow {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(34, 211, 238, 0.15));
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--emerald-400);
  margin-bottom: 20px;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
}

.empty-main-icon {
  filter: drop-shadow(0 4px 10px rgba(16, 185, 129, 0.4));
}

.empty-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  max-width: 380px;
  line-height: 1.5;
}
</style>
