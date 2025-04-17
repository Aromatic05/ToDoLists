<template>
  <div class="card-view-container" ref="container">
    <!-- Current card set -->
    <transition-group 
      name="card-list" 
      tag="div" 
      class="card-container"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div 
        v-for="(card, index) in cards" 
        :key="card.id" 
        class="card-wrapper"
        :data-index="index"
      >
        <BaseCard :data="card" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import BaseCard from './BaseCard.vue';
import CalendarCard from './CalendarCard.vue';
import CardDataService from '../services/CardDataService';

export default {
  name: 'CardView',
  components: {
    BaseCard,
    CalendarCard
  },
  props: {
    viewId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cards: []
    };
  },
  created() {
    this.loadCards();
  },
  watch: {
    viewId() {
      this.loadCards();
    }
  },
  methods: {
    loadCards() {
      this.cards = CardDataService.getCardsForView(this.viewId);
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
    },
    enter(el, done) {
      const delay = el.dataset.index * 20;
      setTimeout(() => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        done();
      }, delay);
    },
    leave(el, done) {
      el.style.transition = 'all 0.3s ease';
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
      setTimeout(done, 300);
    }
  }
};
</script>

<style scoped>
.card-view-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0 24px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 24px 0;
}

.card-wrapper {
  width: 100%;
  padding: 0 2px;
  will-change: transform, opacity;
}

/* 卡片列表动画 */
.card-list-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-list-leave-active {
  transition: all 0.3s ease;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.card-list-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.card-list-move {
  transition: transform 0.3s ease;
}
</style>
