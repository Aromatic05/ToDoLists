<template>
  <div 
    class="card-base"
    @click="handleCardClick"
  >
    <h3 class="card-title">{{ data.title }}</h3>
    <p class="card-content">{{ data.content }}</p>
    <div v-if="data.tags?.length" class="card-tags">
      <span v-for="(tag, i) in data.tags" :key="i" class="card-tag">{{ tag }}</span>
    </div>
  </div>
</template>


<!-- <template>
  <div 
    class="card" 
    @click="handleCardClick"
  >
    <h3>{{ data.title }}</h3>
    <p>{{ data.content }}</p>
    <div v-if="data.tags && data.tags.length > 0" class="card-tags">
      <span v-for="(tag, i) in data.tags" :key="i" class="tag">{{ tag }}</span>
    </div>
  </div>
</template> -->

<script>
export default {
  name: 'BaseCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCardClick() {
      // 显示提示框
      alert('卡片被点击了！');
      // 触发点击事件，让父组件知道卡片被点击了
      this.$emit('click', this.data);
    }
  }
}
</script>

<style>
/* 保留需要覆盖的样式 */
@import '../styles/card.css' ;
.card-base {
  backdrop-filter: blur(15px);
}
</style>
