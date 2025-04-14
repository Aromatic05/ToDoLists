<template>
  <div class="floating-buttons-container">
    <!-- Navigation buttons -->
    <div class="nav-buttons">
      <button 
        v-for="view in views" 
        :key="view.id" 
        class="circle-button nav-button" 
        :class="{ active: currentView === view.id }"
        @click="$emit('view-change', view.id)"
      >
        {{ view.icon }}
      </button>
    </div>
    
    <!-- Theme buttons -->
    <div class="theme-buttons">
      <!-- Dark mode toggle button -->
      <button class="circle-button mode-button" @click="$emit('toggle-dark-mode')">
        {{ isDarkMode ? '🌙' : '☀️' }}
      </button>
      
      <!-- Color picker button -->
      <button class="circle-button theme-button" @click="$emit('toggle-color-picker')">
        🎨
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingButtons',
  props: {
    views: {
      type: Array,
      required: true
    },
    currentView: {
      type: String,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['view-change', 'toggle-dark-mode', 'toggle-color-picker']
}
</script>

<style scoped>
.floating-buttons-container {
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-buttons {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
}

.theme-buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.circle-button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-button:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.circle-button.active {
  background: rgba(66, 133, 244, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
}

/* Dark mode styles */
:deep(.dark-mode) .circle-button {
  background: rgba(40, 40, 40, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: #e1e2e5;
}

:deep(.dark-mode) .circle-button:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
}

:deep(.dark-mode) .circle-button.active {
  background: rgba(138, 180, 248, 0.25);
  color: #8ab4f8;
  box-shadow: 0 4px 12px rgba(138, 180, 248, 0.2);
}
</style>