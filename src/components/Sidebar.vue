<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalCount: Number,
  completedCount: Number,
  completedToday: Number,
  currentStreak: Number,
  recentActivity: Array
})

const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
})

const progressPercent = computed(() => {
  if (props.totalCount === 0) return 0
  return Math.round((props.completedCount / props.totalCount) * 100)
})

const activityIcon = (type) => {
  const icons = {
    added: '➕',
    completed: '✅',
    uncompleted: '↩️',
    deleted: '🗑️'
  }
  return icons[type] || '📌'
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">💪</span>
          <span class="logo-text">DailyFit</span>
        </div>
        <p class="date-label">{{ today }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value green">{{ completedToday }}</div>
          <div class="stat-label">Done Today</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ currentStreak }}</div>
          <div class="stat-label">Day Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalCount }}</div>
          <div class="stat-label">Total Entries</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ completedCount }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-header">
          <span>Overall Progress</span>
          <span class="progress-pct">{{ progressPercent }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <div class="activity-section">
        <h3 class="section-title">Recent Activity</h3>
        <div class="activity-list">
          <TransitionGroup name="activity">
            <div
              v-for="act in recentActivity"
              :key="act.id"
              class="activity-item"
            >
              <span class="activity-icon">{{ activityIcon(act.type) }}</span>
              <div class="activity-body">
                <span class="activity-text">{{ act.text }}</span>
                <span class="activity-time">{{ timeAgo(act.timestamp) }}</span>
              </div>
            </div>
          </TransitionGroup>
          <div v-if="recentActivity.length === 0" class="activity-empty">
            No activity yet. Start tracking!
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  min-width: 300px;
  background: var(--white);
  border-right: 2px solid var(--green-100);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.sidebar-inner {
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 1.6rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--green-800);
  letter-spacing: -0.3px;
}

.date-label {
  font-size: 0.85rem;
  color: var(--gray-500);
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-card {
  background: var(--green-50);
  border-radius: var(--radius);
  padding: 14px 12px;
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  background: var(--green-100);
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--green-800);
  line-height: 1.2;
}

.stat-value.green {
  color: var(--green-600);
}

.stat-label {
  font-size: 0.72rem;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
  font-weight: 600;
}

.progress-section {
  background: var(--gray-50);
  border-radius: var(--radius);
  padding: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: 10px;
}

.progress-pct {
  color: var(--green-600);
}

.progress-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green-500), var(--green-300));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.activity-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  background: var(--gray-50);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.activity-item:hover {
  background: var(--green-50);
}

.activity-icon {
  font-size: 0.8rem;
  line-height: 1.4;
}

.activity-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.activity-text {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--gray-700);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  font-size: 0.7rem;
  color: var(--gray-400);
}

.activity-empty {
  font-size: 0.82rem;
  color: var(--gray-400);
  text-align: center;
  padding: 16px 0;
}

.activity-enter-active {
  animation: fadeInUp 0.3s ease;
}

.activity-leave-active {
  animation: fadeInUp 0.2s ease reverse;
}
</style>
