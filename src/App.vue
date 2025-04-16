<template>
  <div class="app-container">
    <Sidebar 
      :views="views" 
      :current-view="currentView" 
      @view-change="currentView = $event"
      @theme-change="handleThemeChange"
      @toggle-dark-mode="handleDarkModeToggle"
    />
    
    <main class="content">
      <div class="content-wrapper">
        <SearchBar 
          v-model:search-query="searchQuery"
          :show-results="showSearchResults" 
          :results="searchResults"
          @search="searchKnowledge"
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
          <CardView 
            :currentCardSet="currentCards" 
            :nextCardSet="nextCards"
            :nextSetTitle="nextSetTitle"
            @card-click="handleCardClick"
          />
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
import CardDataService from './services/CardDataService';
import KnowledgeBaseService from './services/KnowledgeBaseService';

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
      showSearchResults: false,
      searchResults: [],
      selectedResult: null,
      
      // 视图配置
      views: [
        { id: "home", name: "首页", icon: "mdi-home" },
        { id: "discover", name: "发现", icon: "mdi-compass" },
        { id: "search", name: "知识库", icon: "mdi-book" },
        { id: "profile", name: "个人信息", icon: "mdi-account" },
        { id: "favorites", name: "收藏", icon: "mdi-star" },
        { id: "settings", name: "设置", icon: "mdi-cog" },
      ]
    };
  },
  computed: {
    // 获取当前视图的卡片
    currentCards() {
      return CardDataService.getCardsForView(this.currentView);
    },
    
    // 获取当前视图的下一组卡片
    nextCards() {
      return CardDataService.getNextCardsForView(this.currentView);
    },
    
    // 获取当前视图下一组卡片的标题
    nextSetTitle() {
      return CardDataService.getNextSetTitle(this.currentView);
    }
  },
  methods: {
    // 获取当前视图名称
    getCurrentViewName() {
      const view = this.views.find(v => v.id === this.currentView);
      return view ? view.name : "";
    },
    
    // 处理卡片点击事件
    handleCardClick(card) {
      console.log('Card clicked:', card);
    },
    
    // 处理主题切换
    handleThemeChange(themeName) {
      console.log('Theme changed to:', themeName);
    },
    
    // 处理暗黑模式切换
    handleDarkModeToggle(isDarkMode) {
      console.log('Dark mode changed to:', isDarkMode);
    },
    
    // 搜索知识库
    searchKnowledge() {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        this.showSearchResults = false;
        return;
      }
      
      this.searchResults = KnowledgeBaseService.searchKnowledge(this.searchQuery);
      this.showSearchResults = true;
      
      // 如果用户按回车键并且有搜索结果，自动导航到知识库视图并显示第一个结果
      if (event && event.key === 'Enter' && this.searchResults.length > 0) {
        this.selectSearchResult(this.searchResults[0]);
      }
    },
    
    // 选择搜索结果
    selectSearchResult(result) {
      this.selectedResult = result;
      this.currentView = 'search';
      this.showSearchResults = false;
    },
    
    // 关闭搜索结果
    closeSearchResults(event) {
      if (!event.target.closest('.search-container')) {
        this.showSearchResults = false;
      }
    }
  },
  beforeUnmount() {
    // 移除事件监听
    document.removeEventListener('click', this.closeSearchResults);
  }
};
</script>

<style>
.app-container {
  background: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface);
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>