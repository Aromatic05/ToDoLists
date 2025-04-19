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

    <!-- 局部覆盖层 -->
    <transition name="fade">
      <div v-if="selectedListId" class="list-card-overlay">
        <div class="overlay-header">
          <button class="back-button" @click="handleBackClick">
            <i class="fas fa-arrow-left"></i> 返回
          </button>
        </div>
        <ListCardView :cards="selectedCards" @card-click="handleCardClick" />
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
      selectedCards: []
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
      this.selectedCards = list ? list.cards || [] : [];
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
  position: relative;
  /* 关键定位设置 */
  height: 100%;
  padding: 0 16px;
  background: var(--md-sys-color-background);
  overflow: hidden;
  transition: all 0.5s ease;
  /* 隐藏超出容器的内容 */
}

.list-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: var(--md-sys-color-background);
  padding: 16px 16px 16px 32px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  transition: all 0.5s ease;
  opacity: 1;
}

.overlay-header {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--md-sys-color-outline);
  width: 100%;
  box-sizing: border-box;
}

.back-button {
  background: none;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  font-size: 16px;
  color: var(--md-sys-color-on-background);
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}

.back-button:hover {
  opacity: 0.8;
}

.list-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.5s ease;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>