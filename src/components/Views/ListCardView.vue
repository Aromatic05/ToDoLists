<template>
  <div class="list-card-view">
    <div v-if="cards.length === 0" class="no-cards">
      暂无卡片
    </div>
    <div v-else class="card-grid">
      <BaseCard v-for="card in cards" :key="card.id" :data="card" @click="handleCardClick" />
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/Cards/BaseCard.vue';

export default {
  name: 'ListCardView',
  components: {
    BaseCard
  },
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  watch: {
    cards: {
      handler(newCards) {
        console.log('ListCardView cards updated:', newCards);
      },
      immediate: true
    }
  },
  methods: {
    handleCardClick(card) {
      console.log('Card clicked:', card);
      this.$emit('card-click', card);
    }
  }
};
</script>

<style scoped>
.list-card-view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  box-sizing: border-box;
  max-width: 100%;
}

.card-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
}

.no-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 14px;
}
</style>