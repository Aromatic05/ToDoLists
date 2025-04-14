<template>
  <div class="card" @click="$emit('click', data)">
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
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

.card h3 {
  margin-top: 0;
  color: #202124;
  font-weight: 500;
  font-size: 18px;
  transition: color 0.5s ease;
}

.card p {
  color: #5f6368;
  margin-bottom: 0;
  line-height: 1.5;
  transition: color 0.5s ease;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  padding: 4px 12px;
  background: rgba(66, 133, 244, 0.1);
  color: #4285f4;
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
}

:deep(.dark-mode) .card {
  background: rgba(40, 40, 40, 0.7);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

:deep(.dark-mode) .card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

:deep(.dark-mode) .card h3 {
  color: #e1e2e5;
}

:deep(.dark-mode) .card p {
  color: #b0b3b8;
}

:deep(.dark-mode) .tag {
  background: rgba(138, 180, 248, 0.15);
  color: #8ab4f8;
}
</style>