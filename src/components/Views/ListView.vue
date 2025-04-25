<template>
    <div class="list-view-container" ref="container">
        <!-- 主列表内容 -->
        <div class="list-content">
            <div class="list-container">
                <div v-for="(item, index) in items" :key="item.id" class="list-wrapper">
                    <BaseList :data="item" :isActive="selectedListId === item.id" @click="handleItemClick" />
                </div>
            </div>
            <AddList @click="handleAddClick" />
        </div>

        <!-- 页面式弹出层 -->
        <transition name="page-transition">
            <div v-if="selectedListId" class="page-overlay">
                <div class="page-content">
                    <div class="page-header">
                        <button class="back-button" @click="handleBackClick">
                            <i class="fas fa-arrow-left"></i> 返回
                        </button>
                        <h2 class="page-title">{{ selectedListTitle }}</h2>
                    </div>
                    <div class="page-body">
                        <ListCardView :cards="selectedCards" @card-click="handleCardClick" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import BaseList from '@/components/Lists/BaseList.vue';
import AddList from '@/components/Lists/AddList.vue';
import ListCardView from '@/components/Views/ListCardView.vue';
import ListDataService from '@/services/ListDataService';

export default {
    name: 'ListView',
    components: {
        BaseList,
        AddList,
        ListCardView
    },
    props: {
        viewId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            items: [],
            selectedListId: null,
            selectedCards: [],
            selectedListTitle: ''
        };
    },
    created() {
        this.loadItems();
    },
    watch: {
        viewId() {
            this.loadItems();
            this.selectedListId = null;
            this.selectedCards = [];
        },
        selectedListId(newId) {
            if (newId) {
                this.loadCardsForList(newId);
            } else {
                this.selectedCards = [];
            }
        }
    },
    methods: {
        loadItems() {
            this.items = ListDataService.getItemsForView(this.viewId);
        },
        loadCardsForList(listId) {
            const list = this.items.find(item => item.id === listId);
            if (list) {
                this.selectedCards = list.cards || [];
                this.selectedListTitle = list.title || '列表详情';
            } else {
                this.selectedCards = [];
                this.selectedListTitle = '';
            }
        },
        handleItemClick(item) {
            if (item instanceof Event) return;
            this.selectedListId = this.selectedListId === item.id ? null : item.id;
            this.$emit('item-click', item);
        },
        handleCardClick(card) {
            this.$emit('card-click', card);
        },
        handleAddClick() {
            this.$emit('add-click');
        },
        handleBackClick() {
            this.selectedListId = null;
            this.selectedCards = [];
        }
    }
};
</script>

<style scoped>
.list-view-container {
    height: 100%;
    padding: 0 16px;
    background: var(--md-sys-color-background);
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    transition: all 0.5s ease;
}

.list-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
}

.list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list-wrapper {
    position: relative;
    width: 100%;
}

/* 页面式弹出层 */
.page-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--md-sys-color-background);
    z-index: 100;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    padding: 0 16px;
    /* 匹配容器的内边距 */
    transition: all 0.5s ease;
}

.page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 100%;
    overflow: hidden;
}

.page-header {
    display: flex;
    align-items: center;
    /* padding: 8px 16px; */
    border-bottom: 1px solid var(--md-sys-color-outline-variant);
    background-color: var(--md-sys-color-surface);
    transition: all 0.5s ease;
    height: 48px;
}

.page-title {
    margin: 0 0 0 16px;
    font-size: 18px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface);
}

.page-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;
}

.back-button {
    background: none;
    border: none;
    padding: 8px 0;
    cursor: pointer;
    font-size: 16px;
    color: var(--md-sys-color-primary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.back-button:hover {
    opacity: 0.8;
}

/* 页面过渡动画 - 从下往上弹出 */
.page-transition-enter-active,
.page-transition-leave-active {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.page-transition-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
