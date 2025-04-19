<template>
  <div class="list-item-container">
    <div class="list-item" :class="[data.type || 'base', { 'is-active': isActive }]" @click="handleClick">
      <div class="list-icon">
        <i :class="['mdi', data.icon]"></i>
      </div>
      <div class="list-content">
        <div class="list-title">{{ data.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';

export default {
  name: 'BaseList',
  props: {
    data: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.id && value.title && value.icon;
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      event.stopPropagation();
      this.$emit('click', this.data);
    }
  }
};
</script>

<style scoped>
.list-item-container {
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--md-sys-color-surface);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.list-item:hover {
  background: var(--md-sys-color-surface-variant);
  transform: translateX(4px);
}

.list-item.is-active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.list-item.base {
  border-left: 4px solid var(--md-sys-color-primary);
}

.list-item.important {
  border-left: 4px solid var(--md-sys-color-error);
}

.list-item.completed {
  border-left: 4px solid var(--md-sys-color-tertiary);
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

.list-content {
  flex: 1;
}

.list-title {
  font-size: 14px;
  color: var(--md-sys-color-on-surface);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-active .list-title {
  color: var(--md-sys-color-on-primary-container);
}
</style>