<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        type="text" 
        v-model="searchInput" 
        placeholder="搜索知识库..." 
        @keyup.enter="handleSearch" 
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">
        🔍
      </button>
    </div>
    <div class="search-results" v-if="showResults && results.length > 0">
      <div 
        v-for="(result, index) in results" 
        :key="index" 
        class="search-result-item" 
        @click="handleResultSelect(result)"
      >
        <h4>{{ result.title }}</h4>
        <p>{{ result.preview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    showResults: {
      type: Boolean,
      default: false
    },
    results: {
      type: Array,
      default: () => []
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['search', 'select-result', 'update:searchQuery'],
  data() {
    return {
      searchInput: this.searchQuery
    };
  },
  watch: {
    searchQuery(newVal) {
      this.searchInput = newVal;
    },
    searchInput(newVal) {
      this.$emit('update:searchQuery', newVal);
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchInput);
    },
    handleResultSelect(result) {
      this.$emit('select-result', result);
    }
  }
}
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 24px;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 24px;
  background: var(--md-sys-color-surface-container);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--md-sys-color-on-surface);
  outline: none;
}

.search-button {
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.search-button:hover {
  transform: scale(1.1);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 100;
  animation: slide-down 0.3s ease;
}

.search-result-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

.search-result-item h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: #333;
}

.search-result-item p {
  margin: 0;
  font-size: 14px;
  color: var(--md-sys-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>