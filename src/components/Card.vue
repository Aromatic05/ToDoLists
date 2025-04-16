<template>
  <div 
    class="card" 
    @click="$emit('click', data)"
  >
    <h3>{{ data.title }}</h3>
    <p>{{ data.content }}</p>
    <div v-if="data.tags && data.tags.length > 0" class="card-tags">
      <span v-for="(tag, i) in data.tags" :key="i" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.card {
  padding: 20px; 
  border-radius: 18px;
  background: var(--md-sys-color-surface-container);
  backdrop-filter: blur(15px);
  box-shadow: 0 2px 6px var(--md-sys-color-shadow);
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  min-width: 280px; 
  border: 1px solid var(--md-sys-color-outline);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px var(--md-sys-color-shadow);
  background: var(--md-sys-color-surface-container-high);
}

.card h3 {
  margin-top: 0;
  color: var(--md-sys-color-on-surface);
  font-weight: 500;
  font-size: 18px;
}

.card p {
  color: var(--md-sys-color-on-surface-variant);
  margin-bottom: 0;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  padding: 4px 12px;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid var(--md-sys-color-outline);
}
</style>