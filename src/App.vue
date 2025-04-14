<template>
  <div class="app-container">
    <Sidebar 
      :views="views" 
      :current-view="currentView" 
      :is-dark-mode="isDarkMode"
      @view-change="currentView = $event"
      @toggle-dark-mode="toggleDarkMode"
      @toggle-color-picker="showColorPicker = !showColorPicker"
    />
    
    <ColorPicker 
      :show="showColorPicker" 
      :colors="currentThemeColors" 
      :current-color="currentBgColor"
      :is-dark-mode="isDarkMode"
      @color-change="setBackgroundColor"
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
import ColorPicker from './components/ColorPicker.vue';
import SearchBar from './components/SearchBar.vue';
import CardComponent from './components/Card.vue';
import CardView from './components/CardView.vue';

// 导入服务
import ThemeService from './services/ThemeService';
import KnowledgeBaseService from './services/KnowledgeBaseService';
import CardDataService from './services/CardDataService';

export default {
  components: {
    Sidebar,
    ColorPicker,
    SearchBar,
    CardComponent,
    CardView
  },
  data() {
    return {
      // 视图状态
      currentView: "home",
      
      // 主题状态
      isDarkMode: false,
      currentBgColor: "#f8f9fa",
      showColorPicker: false,
      
      // 搜索状态
      searchQuery: "",
      showSearchResults: false,
      searchResults: [],
      selectedResult: null,
      
      // 视图配置
      views: [
        { id: "home", name: "首页", icon: "🏠" },
        { id: "discover", name: "发现", icon: "🔍" },
        { id: "search", name: "知识库", icon: "📚" },
        { id: "profile", name: "个人信息", icon: "👤" },
        { id: "favorites", name: "收藏", icon: "⭐" },
        { id: "settings", name: "设置", icon: "⚙️" },
      ]
    };
  },
  computed: {
    // 获取当前主题的颜色选项
    currentThemeColors() {
      return ThemeService.getThemeColors(this.isDarkMode);
    },
    
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
    
    // 设置背景颜色
    setBackgroundColor(color) {
      this.currentBgColor = color;
      ThemeService.saveBackgroundColor(color, this.isDarkMode);
    },
    
    // 切换暗黑/浅色模式
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      ThemeService.saveThemePreference(this.isDarkMode);
      // 在根元素切换暗黑模式类名
      document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
      // 同步更新背景色到 CSS 变量
      const defaultColor = ThemeService.getBackgroundColor(this.isDarkMode);
      this.setBackgroundColor(defaultColor);
    },
    setBackgroundColor(color) {
      this.currentBgColor = color;
      // 将颜色设置到 CSS 变量
      document.documentElement.style.setProperty('--user-bg-color', color);
      ThemeService.saveBackgroundColor(color, this.isDarkMode);
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
  mounted() {
    // 加载主题偏好
    this.isDarkMode = ThemeService.loadThemePreference();
    const savedColor = ThemeService.getBackgroundColor(this.isDarkMode);
    document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
    document.documentElement.style.setProperty('--user-bg-color', savedColor);
    this.currentBgColor = savedColor;
  },
  beforeUnmount() {
    // 移除事件监听
    document.removeEventListener('click', this.closeSearchResults);
  }
};
</script>

<style>
.app-container {
  background: var(--user-bg-color, var(--bg-color));
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>