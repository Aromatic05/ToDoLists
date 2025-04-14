<template>
  <div class="card-view-container" 
       ref="container" 
       @scroll="handleScroll"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd">
    
    <!-- Pull down indicator -->
    <div class="pull-indicator" :class="{ active: isPulling, loading: isLoading }">
      <div class="indicator-circle">
        <span v-if="isLoading">⟳</span>
        <span v-else>↓</span>
      </div>
      <div class="indicator-text">{{ isLoading ? '加载中...' : '下拉查看更多' }}</div>
    </div>
    
    <!-- Current card set -->
    <transition-group name="fade" tag="div" class="card-container">
      <div v-for="card in currentCardSet" :key="`current-${card.id}`" class="card-wrapper">
        <CardComponent :data="card" @click="cardClicked(card)" />
      </div>
    </transition-group>
    
    <!-- Next card set (hidden until pulled) -->
    <div v-if="showNextSet" class="next-card-set">
      <h2 class="set-title">{{ nextSetTitle }}</h2>
      <transition-group name="fade" tag="div" class="card-container">
        <div v-for="card in nextCardSet" :key="`next-${card.id}`" class="card-wrapper">
          <CardComponent :data="card" @click="cardClicked(card)" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import CardComponent from './Card.vue';

export default {
  name: 'CardView',
  components: {
    CardComponent
  },
  props: {
    currentCardSet: {
      type: Array,
      required: true
    },
    nextCardSet: {
      type: Array,
      default: () => []
    },
    nextSetTitle: {
      type: String,
      default: '更多内容'
    }
  },
  data() {
    return {
      isPulling: false,
      isLoading: false,
      showNextSet: false,
      pullStartY: 0,
      pullMoveY: 0,
      pullThreshold: 100, // Threshold to activate the pull
      lastScrollTop: 0
    };
  },
  methods: {
    cardClicked(card) {
      this.$emit('card-click', card);
    },
    handleScroll(e) {
      const container = this.$refs.container;
      const isAtTop = container.scrollTop === 0;
      
      // Store last scroll position to detect direction
      this.lastScrollTop = container.scrollTop;
      
      // If user has scrolled to the top and there's a next set,
      // show a hint to pull down for more
      if (isAtTop && this.nextCardSet.length > 0 && !this.isPulling) {
        this.isPulling = true;
        setTimeout(() => {
          if (!this.isLoading) this.isPulling = false;
        }, 2000);
      }
    },
    handleTouchStart(e) {
      if (this.$refs.container.scrollTop > 0) return; // Only allow pull when at the top
      
      this.pullStartY = e.touches[0].clientY;
      this.pullMoveY = this.pullStartY;
    },
    handleTouchMove(e) {
      if (this.$refs.container.scrollTop > 0 || !this.pullStartY) return;
      
      this.pullMoveY = e.touches[0].clientY;
      const pullDistance = this.pullMoveY - this.pullStartY;
      
      if (pullDistance > 0) {
        this.isPulling = true;
        
        // Apply some resistance to the pull
        const resistance = 0.4;
        const translateY = pullDistance * resistance;
        
        if (translateY > this.pullThreshold) {
          this.$refs.container.style.transform = `translateY(${this.pullThreshold}px)`;
        } else {
          this.$refs.container.style.transform = `translateY(${translateY}px)`;
        }
        
        // Prevent default scrolling
        e.preventDefault();
      }
    },
    handleTouchEnd() {
      if (!this.isPulling) return;
      
      const pullDistance = this.pullMoveY - this.pullStartY;
      
      if (pullDistance > this.pullThreshold && this.nextCardSet.length > 0) {
        // Pull distance reached threshold, load next set
        this.loadNextSet();
      } else {
        // Reset position with animation
        this.$refs.container.style.transition = 'transform 0.3s ease';
        this.$refs.container.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          this.$refs.container.style.transition = '';
          this.isPulling = false;
        }, 300);
      }
      
      this.pullStartY = 0;
      this.pullMoveY = 0;
    },
    loadNextSet() {
      this.isLoading = true;
      
      // Animate to threshold and hold
      this.$refs.container.style.transition = 'transform 0.2s ease';
      this.$refs.container.style.transform = `translateY(${this.pullThreshold}px)`;
      
      // Simulate loading with timeout
      setTimeout(() => {
        // Show next set with animation
        this.showNextSet = true;
        
        setTimeout(() => {
          // Reset position
          this.$refs.container.style.transition = 'transform 0.5s ease';
          this.$refs.container.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            this.$refs.container.style.transition = '';
            this.isPulling = false;
            this.isLoading = false;
          }, 500);
        }, 300);
      }, 1000);
    }
  }
};
</script>

<style scoped>
.card-view-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* For smooth iOS scrolling */
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
}

.pull-indicator {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: translateY(0);
  opacity: 0;
  pointer-events: none;
}

.pull-indicator.active {
  opacity: 1;
  transform: translateY(60px);
}

.indicator-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
}

.indicator-circle span {
  transition: transform 0.3s ease;
}

.indicator-text {
  font-size: 14px;
  color: #666;
}

.pull-indicator.loading .indicator-circle span {
  animation: spin 1s infinite linear;
}

.next-card-set {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.3s;
}

.next-card-set.show {
  opacity: 1;
  transform: translateY(0);
}

.set-title {
  font-size: 24px;
  font-weight: 500;
  margin: 24px 0;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

:deep(.dark-mode) .indicator-circle {
  background: rgba(40, 40, 40, 0.8);
}

:deep(.dark-mode) .indicator-text {
  color: #b0b3b8;
}

:deep(.dark-mode) .set-title {
  color: #e1e2e5;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>