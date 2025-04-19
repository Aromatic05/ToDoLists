<template>
  <div class="add-list-item" @click="handleClick">
    <div class="list-icon">
      <i class="mdi mdi-plus"></i>
    </div>
    <div class="list-title">新建列表</div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';

export default {
  name: 'AddList',
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.add-list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--md-sys-color-surface);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  border: 1px dashed var(--md-sys-color-outline);
  width: 280px;
}

.add-list-item:hover {
  background: var(--md-sys-color-surface-variant);
  transform: translateX(4px);
  border-color: var(--md-sys-color-primary);
}

.list-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: var(--md-sys-color-primary);
}

.list-title {
  font-size: 14px;
  color: var(--md-sys-color-on-surface);
}
</style>