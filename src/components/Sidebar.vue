<template>
    <div class="floating-buttons-container">
        <!-- Navigation buttons -->
        <div class="nav-buttons">
            <button v-for="view in views" :key="view.id" class="circle-button nav-button"
                :class="{ active: currentView === view.id }" @click="handleViewChange(view.id)">
                <i :class="['mdi', view.icon]"></i>
            </button>
        </div>

        <!-- Theme buttons -->
        <div class="theme-buttons">
            <!-- Theme selector -->
            <div class="theme-selector" ref="themeSelector">
                <button class="circle-button theme-select" @click="toggleThemeOptions">
                    <div class="theme-color-circle" :style="{ background: getThemeColor(currentTheme) }"></div>
                </button>
                <div v-if="showThemeOptions" class="theme-options">
                    <button v-for="theme in availableThemes" :key="theme.name" class="theme-option"
                        :class="{ active: currentTheme === theme.name }" @click="selectTheme(theme.name)">
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

        // 添加全局点击事件监听器
        document.addEventListener('click', this.handleOutsideClick);
    },
    
    beforeUnmount() {
        // 组件销毁前移除事件监听器
        document.removeEventListener('click', this.handleOutsideClick);
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
        },

        toggleThemeOptions(event) {
            // 阻止事件冒泡，避免立即触发外部点击事件
            event.stopPropagation();
            this.showThemeOptions = !this.showThemeOptions;
        },

        handleOutsideClick(event) {
            // 如果主题选项菜单当前打开
            if (this.showThemeOptions) {
                // 检查点击是否在主题选择器内
                const themeSelector = this.$refs.themeSelector;
                if (themeSelector && !themeSelector.contains(event.target)) {
                    // 点击在主题选择器外部，关闭菜单
                    this.showThemeOptions = false;
                }
            }
        }
    }
};
</script>

<style scoped>
.floating-buttons-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 9999; 
}

.nav-buttons {
    position: fixed;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 9999; 
}

.theme-buttons {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 9999 ;
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
    z-index: 10000;
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
    /* z-index: 10000; */
}

.theme-option:hover {
    background: var(--md-sys-color-surface-variant);
}

.theme-option.active {
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
}
</style>
