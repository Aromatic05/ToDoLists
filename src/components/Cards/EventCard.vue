<template>
    <div class="card-base" @click.stop="handleCardClick">
        <div class="card-header">
            <h3 class="card-title">{{ localData.title }}</h3>
            <span v-if="localData.date" class="card-date"
                :style="{ color: localData.dateColor || 'var(--md-sys-color-on-surface-variant)' }">
                {{ localData.date }}
            </span>
        </div>
        <p class="card-content">{{ localData.content }}</p>
        <div v-if="localData.tags?.length" class="card-tags">
            <span v-for="(tag, i) in localData.tags" :key="i" class="card-tag">{{ tag }}</span>
        </div>
    </div>

    <CardContentModal v-model="showModal" :card-data="localData" @confirm="handleConfirm" />
</template>

<script>
import CardContentModal from '@/components/Modals/CardContentModal.vue'

export default {
    name: 'EventCard',
    components: {
        CardContentModal
    },
    emits: ['update'],
    props: {
        data: {
            type: Object,
            required: true,
            validator: (value) => value?.id && value?.title && value?.content
        }
    },
    data() {
        return {
            showModal: false,
            localData: { ...this.data }  // 添加本地数据
        }
    },
    watch: {
        data: {
            handler(newVal) {
                console.log('Card data updated:', newVal)
                this.localData = { ...newVal }  // 更新本地数据
            },
            deep: true,  // 深度监听对象变化
            immediate: true  // 组件创建时立即执行
        }
    },
    methods: {
        handleCardClick() {
            this.showModal = true
        },
        handleConfirm(updatedData) {
            console.log('EventCard updating:', updatedData)
            this.localData = { ...updatedData }  // 更新本地数据
            this.$emit('update', updatedData)
        }
    }
}
</script>

<style>
@import '@/styles/card.css';
</style>