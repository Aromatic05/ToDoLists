<template>
  <div class="add-list-wrapper">
    <!-- 触发按钮 -->
    <div 
      class="add-list-item" 
      @click="showModal = true" 
      role="button"
      aria-label="新建列表"
    >
      <div class="list-icon">
        <i class="mdi mdi-plus"></i>
      </div>
      <div class="list-title">新建列表</div>
    </div>

    <!-- 内置弹窗组件 -->
    <AddListModal
      v-model="showModal"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import AddListModal from '@/components/Modals/AddListModal.vue'

export default {
  name: 'AddList',
  components: {
    AddListModal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleConfirm(listName) {
      // 将输入值传递给父组件
      this.$emit('create', listName)
    }
  }
}
</script>

<style scoped>
/* 按钮样式 */
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
  user-select: none;
}

.add-list-item:hover {
  background: var(--md-sys-color-surface-variant);
  transform: translateX(4px);
  border-color: var(--md-sys-color-primary);
}

.add-list-item:active {
  transform: translateX(2px) scale(0.98);
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
  font-weight: 500;
}

/* 移动端优化 */
@media (max-width: 480px) {
  .add-list-item {
    width: 100%;
    margin-top: 12px;
    padding: 10px 12px;
  }
  
  .list-icon {
    margin-right: 8px;
  }
}
</style>