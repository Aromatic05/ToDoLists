<template>
  <div class="app-container">
    <Sidebar 
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
            <CardComponent :data="selectedResult" />
          </div>
          <div v-else class="no-result">
            <p>请输入关键词搜索知识库</p>
          </div>
        </div>
        
        <!-- Regular Views with CardView component -->
        <div v-else class="view-content">
          <CardView :viewId="currentView" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import SearchBar from './components/SearchBar.vue';
import CardComponent from './components/Card.vue';
import CardView from './components/CardView.vue';

export default {
  components: {
    Sidebar,
    SearchBar,
    CardComponent,
    CardView
  },
  data() {
    return {
      // 视图状态
      currentView: "home",
      
      // 搜索状态
      searchQuery: "",
      selectedResult: null
    };
  },
  methods: {
    // 获取当前视图名称
    getCurrentViewName() {
      const viewNames = {
        'home': '首页',
        'discover': '发现',
        'search': '知识库',
        'profile': '个人信息',
        'favorites': '收藏',
        'settings': '设置'
      };
      return viewNames[this.currentView] || this.currentView;
    },
    
    // 选择搜索结果
    selectSearchResult(result) {
      this.selectedResult = result;
      this.currentView = 'search';
    }
  }
};
</script>

<style>
@import './styles/layout.css' ;

 .app-container {
  background: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface);
  transition: background-color 0.5s ease, color 0.5s ease;
} 
</style>