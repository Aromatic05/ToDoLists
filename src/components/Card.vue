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
  background: var(--card-bg, rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(15px);
  box-shadow: var(--card-shadow, 0 4px 10px rgba(0, 0, 0, 0.05));
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  min-width: 280px; 
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-hover-shadow, 0 8px 15px rgba(0, 0, 0, 0.08));
}

.card h3 {
  margin-top: 0;
  color: var(--text-color-primary, #202124);
  font-weight: 500;
  font-size: 18px;
}

.card p {
  color: var(--text-color-secondary, #5f6368);
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
  background: var(--tag-bg, rgba(66, 133, 244, 0.1));
  color: var(--tag-color, #4285f4);
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
}

</style>