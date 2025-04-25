<template>
    <div class="app-container">
        <Sidebar :activeView="currentView" @view-change="currentView = $event" />

        <main class="content">
            <div class="content-wrapper">
                <!-- Main Content Area -->
                <div class="main-content">
                    <!-- Left Content -->
                    <div class="left-content">
                        <SearchBar v-model:search-query="searchQuery" @select-result="selectSearchResult" />

                        <!-- <h2 class="view-title">{{ getCurrentViewName() }}</h2> -->

                        <!-- Search Results View -->
                        <div v-if="currentView === 'search'" class="search-view">
                            <div v-if="selectedResult" class="selected-result"></div>
                            <div v-else class="no-result">
                                <p>请输入关键词搜索知识库</p>
                            </div>
                        </div>

                        <!-- Dynamic Views -->
                        <div class="view-content">
                            <component :is="getViewComponent(currentView)" :viewId="currentView" />
                        </div>
                    </div>

                    <!-- <div class="card-container"> </div> -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import SearchBar from '@/components/SearchBar.vue';
import CardView from '@/components/Views/CardView.vue';
import ListView from '@/components/Views/ListView.vue';
import SettingView from '@/components/Views/SettingView.vue';
import CalendarView from '@/components/Views/CalendarView.vue';

export default {
    name: 'App',
    components: {
        Sidebar,
        SearchBar,
        CardView,
        ListView,
        SettingView,
        CalendarView,
    },
    data() {
        return {
            // 视图状态
            currentView: "home",

            // 搜索状态
            searchQuery: "",
            selectedResult: null,

            // 视图配置
            viewNames: {
                'home': { name: '首页', type: 'list' },
                'settings': { name: '设置', type: 'setting' },
                "timeView": { name: "时间视图", type: 'calendar', icon: "mdi-calendar-clock" },
                "orderView": { name: "排序视图", icon: "mdi-sort" },
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
            const viewType = this.viewNames[viewId]?.type;
            if (!viewType) {
                console.warn(`未找到视图类型: ${viewId}`);
                return 'CardView';
            }
            const componentMap = {
                'card': 'CardView',
                'list': 'ListView',
                'calendar': 'CalendarView',
                'add': 'AddView',
                'setting': 'SettingView',
            };
            const component = componentMap[viewType];
            if (!component) {
                console.warn(`未找到对应的组件: ${viewType}`);
                return 'CardView';
            }
            return component;
        },
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
