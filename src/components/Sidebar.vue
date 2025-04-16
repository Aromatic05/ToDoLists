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
            <div class="theme-color-circle" :style="{ background: getThemeColor(theme.name) }"></div>
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
import ThemeService from '../services/ThemeService';
import '@mdi/font/css/materialdesignicons.css';

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
    }
  },
  data() {
    return {
      showThemeOptions: false,
      currentTheme: 'Green',
      isDarkMode: false
    };
  },
  computed: {
    availableThemes() {
      return ThemeService.getThemes();
    }
  },
  methods: {
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
      const themeColors = {
        'Green': '#4CAF50',
        'Red': '#F44336',
        'Blue': '#2196F3',
        'Yellow': '#FFC107',
        'Purple': '#9C27B0'
      };
      return themeColors[themeName] || themeColors['Green'];
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