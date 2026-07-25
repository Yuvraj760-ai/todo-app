import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'exercise-tracker-todos'
const ACTIVITY_KEY = 'exercise-tracker-activity'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function todayDateString() {
  return new Date().toDateString()
}

export function useTodos() {
  const todos = ref(loadFromStorage(STORAGE_KEY, []))
  const activityLog = ref(loadFromStorage(ACTIVITY_KEY, []))

  watch(todos, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  watch(activityLog, (val) => {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(val))
  }, { deep: true })

  function pushActivity(type, text) {
    activityLog.value.unshift({
      id: Date.now() + Math.random(),
      type,
      text,
      timestamp: new Date().toISOString()
    })
    if (activityLog.value.length > 50) {
      activityLog.value = activityLog.value.slice(0, 50)
    }
  }

  function addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    todos.value.push(todo)
    pushActivity('added', text)
  }

  function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    todo.completed = !todo.completed
    todo.completedAt = todo.completed ? new Date().toISOString() : null
    pushActivity(todo.completed ? 'completed' : 'uncompleted', todo.text)
  }

  function removeTodo(id) {
    const idx = todos.value.findIndex(t => t.id === id)
    if (idx === -1) return
    const text = todos.value[idx].text
    todos.value.splice(idx, 1)
    pushActivity('deleted', text)
  }

  const sortedTodos = computed(() =>
    [...todos.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const totalCount = computed(() => todos.value.length)

  const completedCount = computed(() =>
    todos.value.filter(t => t.completed).length
  )

  const completedToday = computed(() => {
    const today = todayDateString()
    return todos.value.filter(t => t.completed && new Date(t.completedAt).toDateString() === today).length
  })

  const currentStreak = computed(() => {
    const completedDates = new Set()
    todos.value.filter(t => t.completed).forEach(t => {
      completedDates.add(new Date(t.completedAt).toDateString())
    })

    let streak = 0
    const today = new Date()

    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const key = date.toDateString()

      if (completedDates.has(key)) {
        streak++
      } else if (i > 0) {
        break
      }
    }

    return streak
  })

  const recentActivity = computed(() => activityLog.value.slice(0, 10))

  return {
    todos: sortedTodos,
    totalCount,
    completedCount,
    completedToday,
    currentStreak,
    recentActivity,
    addTodo,
    toggleTodo,
    removeTodo
  }
}
