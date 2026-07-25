<script setup>
import { computed } from 'vue'
import {
  Dumbbell,
  Flame,
  CheckCircle2,
  Layers,
  Trophy,
  PlusCircle,
  RotateCcw,
  Trash2,
  Activity,
  Calendar,
  Sparkles,
  TrendingUp
} from 'lucide-vue-next'

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
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
})

const progressPercent = computed(() => {
  if (props.totalCount === 0) return 0
  return Math.round((props.completedCount / props.totalCount) * 100)
})

const activityIconComponent = (type) => {
  switch (type) {
    case 'added': return PlusCircle
    case 'completed': return CheckCircle2
    case 'uncompleted': return RotateCcw
    case 'deleted': return Trash2
    default: return Activity
  }
}

const activityIconClass = (type) => {
  switch (type) {
    case 'added': return 'icon-emerald animate-icon-pop'
    case 'completed': return 'icon-teal animate-icon-spin'
    case 'uncompleted': return 'icon-amber animate-icon-slide'
    case 'deleted': return 'icon-rose animate-icon-pop'
    default: return 'icon-cyan animate-icon-drop'
  }
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
      <!-- App Header Logo -->
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon-box icon-hover-float">
            <Dumbbell class="logo-icon animate-icon-pop" :size="26" />
          </div>
          <div class="logo-text-group">
            <span class="logo-text">DailyFit <span class="logo-badge">PRO</span></span>
            <div class="date-badge">
              <Calendar class="date-icon animate-icon-slide icon-delay-1" :size="14" />
              <span class="date-label">{{ today }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid with Moving Entrance Icons -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon-wrapper green-glow">
              <CheckCircle2 class="stat-icon animate-icon-pop icon-delay-1" :size="20" />
            </div>
            <span class="stat-trend">+{{ completedToday }} today</span>
          </div>
          <div class="stat-value green">{{ completedToday }}</div>
          <div class="stat-label">Done Today</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon-wrapper orange-glow">
              <Flame class="stat-icon animate-icon-spin icon-delay-2" :size="20" />
            </div>
            <span class="stat-trend">Streak</span>
          </div>
          <div class="stat-value orange">{{ currentStreak }} <span class="unit">days</span></div>
          <div class="stat-label">Day Streak</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon-wrapper cyan-glow">
              <Layers class="stat-icon animate-icon-drop icon-delay-3" :size="20" />
            </div>
          </div>
          <div class="stat-value">{{ totalCount }}</div>
          <div class="stat-label">Total Exercises</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon-wrapper purple-glow">
              <Trophy class="stat-icon animate-icon-pop icon-delay-4" :size="20" />
            </div>
          </div>
          <div class="stat-value purple">{{ completedCount }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>

      <!-- Progress Bar Section -->
      <div class="progress-section">
        <div class="progress-header">
          <div class="progress-title">
            <TrendingUp class="progress-title-icon animate-icon-slide icon-delay-2" :size="16" />
            <span>Overall Progress</span>
          </div>
          <span class="progress-pct">{{ progressPercent }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          >
            <div class="progress-shimmer"></div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="activity-section">
        <div class="section-header">
          <Sparkles class="section-header-icon animate-icon-spin icon-delay-3" :size="16" />
          <h3 class="section-title">Recent Activity</h3>
        </div>
        <div class="activity-list">
          <TransitionGroup name="activity">
            <div
              v-for="(act, idx) in recentActivity"
              :key="act.id"
              class="activity-item"
            >
              <div class="activity-icon-wrapper" :class="activityIconClass(act.type)">
                <component
                  :is="activityIconComponent(act.type)"
                  :size="15"
                />
              </div>
              <div class="activity-body">
                <span class="activity-text">{{ act.text }}</span>
                <span class="activity-time">{{ timeAgo(act.timestamp) }}</span>
              </div>
            </div>
          </TransitionGroup>
          <div v-if="recentActivity.length === 0" class="activity-empty">
            <Activity class="empty-act-icon animate-icon-drop icon-delay-2" :size="24" />
            <p>No activity recorded yet</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 320px;
  min-width: 320px;
  background: var(--sidebar-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid var(--card-border);
  min-height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  box-shadow: var(--shadow-glow);
  z-index: 10;
}

.sidebar-inner {
  padding: 30px 22px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--emerald-500), var(--cyan-400));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0d1520;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
}

.logo-text-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo-text {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-badge {
  font-size: 0.65rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--emerald-400), var(--teal-400));
  color: #0d1520;
  padding: 2px 6px;
  border-radius: 6px;
  letter-spacing: 0.8px;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}

.date-icon {
  color: var(--emerald-400);
}

.date-label {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  background: var(--card-hover);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.stat-icon-wrapper {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
}

.green-glow { color: var(--emerald-400); background: rgba(16, 185, 129, 0.15); }
.orange-glow { color: #f97316; background: rgba(249, 115, 22, 0.15); }
.cyan-glow { color: var(--cyan-400); background: rgba(34, 211, 238, 0.15); }
.purple-glow { color: #a855f7; background: rgba(168, 85, 247, 0.15); }

.stat-trend {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--emerald-400);
}

.stat-value {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.1;
}

.stat-value.green { color: var(--emerald-400); }
.stat-value.orange { color: #fb923c; }
.stat-value.purple { color: #c084fc; }

.unit {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Progress Bar */
.progress-section {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
}

.progress-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-title-icon {
  color: var(--teal-400);
}

.progress-pct {
  color: var(--emerald-400);
}

.progress-bar {
  height: 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--emerald-500), var(--cyan-400));
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.progress-shimmer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Activity Section */
.activity-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header-icon {
  color: var(--cyan-400);
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.activity-item:hover {
  background: var(--card-hover);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.activity-icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-emerald { background: rgba(16, 185, 129, 0.15); color: var(--emerald-400); }
.icon-teal { background: rgba(45, 212, 191, 0.15); color: var(--teal-400); }
.icon-amber { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
.icon-rose { background: rgba(248, 113, 113, 0.15); color: var(--red-400); }
.icon-cyan { background: rgba(34, 211, 238, 0.15); color: var(--cyan-400); }

.activity-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.activity-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  font-size: 0.7rem;
  color: var(--text-dim);
}

.activity-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  color: var(--text-dim);
  font-size: 0.82rem;
}

.empty-act-icon {
  color: var(--text-dim);
}

/* Transition Group Animations */
.activity-enter-active {
  animation: slideInRight 0.35s ease forwards;
}

.activity-leave-active {
  animation: slideOutLeft 0.3s ease forwards;
}
</style>
