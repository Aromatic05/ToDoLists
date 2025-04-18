<template>
  <div class="list-view-container" ref="container">
    <div class="list-content">
      <div class="list-container">
        <div 
          v-for="(item, index) in items" 
          :key="item.id" 
          class="list-wrapper"
        >
          <BaseList 
            :data="item" 
            :isActive="selectedListId === item.id"
            @click="handleItemClick"
          />
        </div>
      </div>
      <AddList @click="handleAddClick" />
    </div>
    <div class="card-preview">
      <ListCardView 
        v-if="selectedListId" 
        :cards="selectedCards" 
        @card-click="handleCardClick"
      />
      <CardView v-else :viewId="viewId" />
    </div>
  </div>
</template>

<script>
import BaseList from './BaseList.vue';
import AddList from './AddList.vue';
import CardView from './CardView.vue';
import ListCardView from './ListCardView.vue';
import ListDataService from '../services/ListDataService';

export default {
  name: 'ListView',
  components: {
    BaseList,
    AddList,
    CardView,
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
      if (item instanceof Event) {
        return;
      }
      console.log('List item clicked:', item);
      if (this.selectedListId === item.id) {
        this.selectedListId = null;
        this.selectedCards = [];
      } else {
        this.selectedListId = item.id;
        this.selectedCards = item.cards || [];
      }
      console.log('Selected cards:', this.selectedCards);
      this.$emit('item-click', item);
    },
    handleCardClick(card) {
      this.$emit('card-click', card);
    },
    handleAddClick() {
      this.$emit('add-click');
    }
  }
};
</script>

<style scoped>
.list-view-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0 16px;
  display: flex;
  gap: 24px;
}

.list-content {
  width: 280px;
  flex-shrink: 0;
}

.list-container {
  width: 100%;
  margin: 0;
  padding: 16px 0;
}

.card-preview {
  flex: 1;
  min-width: 0;
  padding: 16px 0;
}

.list-wrapper {
  width: 100%;
  margin-bottom: 8px;
  transition: transform 0.2s ease;
}

.list-wrapper:hover {
  transform: translateX(4px);
}
</style> 