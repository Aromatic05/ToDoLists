<template>
    <div class="card-base" @click.stop="handleCardClick">
        <div class="card-header">
            <h3 class="card-title">{{ data.title }}</h3>
            <span v-if="data.date" class="card-date"
                :style="{ color: data.dateColor || 'var(--md-sys-color-on-surface-variant)' }">
                {{ data.date }}
            </span>
        </div>
        <p class="card-content">{{ data.content }}</p>
        <div v-if="data.tags?.length" class="card-tags">
            <span v-for="(tag, i) in data.tags" :key="i" class="card-tag">{{ tag }}</span>
        </div>
    </div>

    <CardContentModal v-model="showModal" @confirm="handleConfirm" />
</template>

<script>
import CardContentModal from '@/components/Modals/CardContentModal.vue'

export default {
    name: 'EventCard',
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