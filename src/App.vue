<template>
  <div class="app-container">
    <Sidebar 
      :activeView="currentView"
      @view-change="currentView = $event"
      @theme-change="handleThemeChange"
      @toggle-dark-mode="handleDarkModeToggle"
    />
    
    <main class="content">
      <div class="content-wrapper">
        <SearchBar 
          v-model:search-query="searchQuery"
          @select-result="selectSearchResult"
        />

        <h2 class="view-title">{{ getCurrentViewName() }}</h2>
        
        <!-- Search Results View -->
        <div v-if="currentView === 'search'" class="search-view">
          <div v-if="selectedResult" class="selected-result">
            <BaseCard :data="selectedResult" />
          </div>
          <div v-else class="no-result">
            <p>请输入关键词搜索知识库</p>
          </div>
        </div>
        
        <!-- Dynamic Views -->
        <div class="view-content">
          <component 
            :is="getViewComponent(currentView)" 
            :viewId="currentView" 
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import SearchBar from './components/SearchBar.vue';
import CardView from './components/CardView.vue';
import ListView from './components/ListView.vue';
import BaseCard from './components/BaseCard.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    SearchBar,
    CardView,
    ListView,
    BaseCard
  },
  data() {
    return {
      // 视图状态
      currentView: "timeView",
      
      // 搜索状态
      searchQuery: "",
      selectedResult: null,

      // 视图配置
      viewNames: {
        'home': { name: '首页', type: 'list' },
        'discover': { name: '发现', type: 'card' },
        'search': { name: '知识库', type: 'card' },
        'profile': { name: '个人信息', type: 'card' },
        'favorites': { name: '收藏', type: 'card' },
        'settings': { name: '设置', type: 'card' }
      }
    };
  },
  methods: {
    // 获取当前视图名称
    getCurrentViewName() {
      return this.viewNames[this.currentView]?.name || this.currentView;
    },
    
    // 选择搜索结果
    selectSearchResult(result) {
      this.selectedResult = result;
      this.currentView = 'search';
    },

    // 获取视图组件
    getViewComponent(viewId) {
      const viewType = this.viewNames[viewId]?.type || 'card';
      const componentMap = {
        'card': 'CardView',
        'list': 'ListView',
        'calendar': 'CalendarView',
        'add': 'AddView'
      };
      return componentMap[viewType];
    },

    // 处理主题变更
    handleThemeChange(themeName) {
      console.log('Theme changed to:', themeName);
      // 这里可以添加主题变更的具体逻辑
    },

    // 处理暗黑模式切换
    handleDarkModeToggle(isDarkMode) {
      console.log('Dark mode:', isDarkMode);
      // 这里可以添加暗黑模式切换的具体逻辑
    }
  }
};
</script>

<style>
@import './styles/layout.css';

.app-container {
  background: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface);
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>
