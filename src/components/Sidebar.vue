<template>
  <div class="floating-buttons-container">
    <!-- Navigation buttons -->
    <div class="nav-buttons">
      <button 
        v-for="view in views" 
        :key="view.id" 
        class="circle-button nav-button" 
        :class="{ active: currentView === view.id }"
        @click="handleViewChange(view.id)"
      >
        <i :class="['mdi', view.icon]"></i>
      </button>
    </div>
    
    <!-- Theme buttons -->
    <div class="theme-buttons">
      <!-- Theme selector -->
      <div class="theme-selector">
        <button class="circle-button theme-select" @click="showThemeOptions = !showThemeOptions">
          <div class="theme-color-circle" :style="{ background: getThemeColor(currentTheme) }"></div>
        </button>
        <div v-if="showThemeOptions" class="theme-options">
          <button 
            v-for="theme in availableThemes" 
            :key="theme.name" 
            class="theme-option"
            :class="{ active: currentTheme === theme.name }"
            @click="selectTheme(theme.name)"
          >
            <div class="theme-color-circle" :style="{ background: theme.color }"></div>
            <span>{{ theme.name }}</span>
          </button>
        </div>
      </div>
      
      <!-- Dark mode toggle button -->
      <button class="circle-button mode-button" @click="toggleDarkMode">
        <i :class="['mdi', isDarkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny']"></i>
      </button>
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
import ThemeService from '@/services/ThemeService';

export default {
  name: 'FloatingButtons',
  props: {
    activeView: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      showThemeOptions: false,
      currentView: "this.activeView",
      currentTheme: "Green",
      isDarkMode: false,
      views: [
        { id: "home", name: "首页", icon: "mdi-home" },
        { id: "timeView", name: "时间视图", icon: "mdi-calendar-clock" },
        { id: "orderView", name: "排序视图", icon: "mdi-sort" },
        { id: "settings", name: "设置", icon: "mdi-cog" },
      ],
      availableThemes: ThemeService.getThemes()
    };
  },
  watch: {
    activeView(newVal) {
      this.currentView = newVal;
    }
  },
  mounted() {
    // 加载主题偏好
    const { themeName, isDarkMode } = ThemeService.loadThemePreference();
    this.currentTheme = themeName;
    this.isDarkMode = isDarkMode;
    this.applyTheme();
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
      this.applyTheme();
    });
  },
  methods: {
    handleViewChange(viewId) {
      this.currentView = viewId;
      this.$emit('view-change', viewId);
    },
    
    selectTheme(themeName) {
      this.currentTheme = themeName;
      this.showThemeOptions = false;
      ThemeService.saveThemePreference(themeName, this.isDarkMode);
      this.applyTheme();
      this.$emit('theme-change', themeName);
    },
    
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      ThemeService.saveThemePreference(this.currentTheme, this.isDarkMode);
      this.applyTheme();
      this.$emit('toggle-dark-mode', this.isDarkMode);
    },
    
    getThemeColor(themeName) {
      return ThemeService.getThemeColor(themeName);
    },

    applyTheme() {
      const themeClass = ThemeService.getThemeClassName(this.currentTheme, this.isDarkMode);
      // 移除所有主题类
      document.documentElement.classList.remove(...ThemeService.themes.flatMap(t => [t.light, t.dark]));
      // 添加当前主题类
      document.documentElement.classList.add(themeClass);
      // 确保背景颜色更新
      document.documentElement.style.backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--md-sys-color-background');
    }
  }
};
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
  background: var(--md-sys-color-surface);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px var(--md-sys-color-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-button:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 14px var(--md-sys-color-primary);
}

.circle-button.active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  box-shadow: 0 4px 12px var(--md-sys-color-primary);
}

.mdi {
  font-size: 24px;
  color: var(--md-sys-color-on-surface);
}

.circle-button.active .mdi {
  color: var(--md-sys-color-on-primary-container);
}

.theme-color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--md-sys-color-outline);
}

.theme-options {
  position: absolute;
  bottom: 60px;
  left: 0;
  background: var(--md-sys-color-surface);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 12px var(--md-sys-color-shadow);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background: transparent;
  border: none;
  color: var(--md-sys-color-on-surface);
  cursor: pointer;
  transition: background-color 0.2s;
}

.theme-option:hover {
  background: var(--md-sys-color-surface-variant);
}

.theme-option.active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
</style>

// 实现非线性切换动画
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
  background: var(--md-sys-color-surface);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px var(--md-sys-color-shadow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 非线性弹性动画 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 添加相对定位用于动画效果 */
}

.circle-button:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 14px var(--md-sys-color-primary);
}

.circle-button.active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  box-shadow: 0 4px 12px var(--md-sys-color-primary);
}

/* 添加按钮动画效果 */
.nav-button::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--md-sys-color-primary);
  opacity: 0;
  transform: scale(0);
  z-index: -1;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
}

.nav-button.active::before {
  opacity: 0.2;
  transform: scale(1.2);
}

/* 主题按钮动画 */
.theme-select, .mode-button {
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
}

.theme-select:active, .mode-button:active {
  transform: scale(0.9);
}

.mdi {
  font-size: 24px;
  color: var(--md-sys-color-on-surface);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease;
}

.circle-button.active .mdi {
  color: var(--md-sys-color-on-primary-container);
  transform: scale(1.1);
}

.theme-color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--md-sys-color-outline);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease;
}

.theme-select:hover .theme-color-circle {
  transform: scale(1.1);
}

.theme-options {
  position: absolute;
  bottom: 60px;
  left: 0;
  background: var(--md-sys-color-surface);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 12px var(--md-sys-color-shadow);
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform-origin: bottom left;
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background: transparent;
  border: none;
  color: var(--md-sys-color-on-surface);
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.theme-option:hover {
  background: var(--md-sys-color-surface-variant);
  transform: translateX(4px);
}

.theme-option.active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
</style>