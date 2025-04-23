<template>
    <!-- 卡片主体 -->
    <div class="card-base" @click.stop="handleCardClick">
        <h3 class="card-title">{{ data.title }}</h3>
        <p class="card-content">{{ data.content }}</p>
        <div v-if="data.tags?.length" class="card-tags">
            <span v-for="(tag, i) in data.tags" :key="i" class="card-tag">{{ tag }}</span>
        </div>

        <!-- 将弹窗移到卡片外部 -->
    </div>

    <!-- 独立弹窗 -->
    <CardContentModal v-model="showModal" @confirm="handleConfirm" />
</template>

<script>
import CardContentModal from '@/components/Modals/CardContentModal.vue'

export default {
    name: 'BaseCard',
    components: {
        CardContentModal
    },
    data() {
        return {
            showModal: false
        }
    },
    props: {
        data: {
            type: Object,
            required: true,
            validator: (value) => value?.id && value?.title && value?.content
        }
    },
    methods: {
        handleCardClick() {
            // 阻止事件冒泡
            this.showModal = true
        },
        handleConfirm(listName) {
            this.$emit('create', listName)
        }
    }
}
</script>

<style>
@import '@/styles/card.css';
</style>