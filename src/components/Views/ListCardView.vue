<template>
    <div class="list-card-view">
        <div v-if="cards.length === 0" class="no-cards">
            暂无卡片
        </div>
        <div v-else class="card-grid">
            <EventCard v-for="card in cards" :key="card.id" :data="card" @update="handleCardUpdate" />
        </div>
        <!-- 悬浮按钮 -->
        <button class="floating-add-button" @click="handleAddClick">+</button>
        <AddCardModal v-model="showAddModal" @confirm="handleAddConfirm" />
    </div>
</template>

<script>
import EventCard from '@/components/Cards/EventCard.vue';
import AddCardModal from '@/components/Modals/AddCardModal.vue';

export default {
    name: 'ListCardView',
    components: {
        EventCard,
        AddCardModal
    },
    props: {
        cards: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            showAddModal: false
        }
    },
    methods: {
        handleAddClick() {
            this.showAddModal = true;
        },
        handleAddConfirm(cardData) {
            this.$emit('add-card', cardData);
            this.showAddModal = false;
        },
        handleCardUpdate(updatedCard) {
            console.log('ListCardView updating card:', updatedCard);
            this.$emit('update-card', updatedCard);
        }
    }
};
</script>

<style scoped>
.list-card-view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    box-sizing: border-box;
    max-width: 100%;
}

.card-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 8px;
}

.no-cards {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--md-sys-color-on-surface-variant);
    font-size: 14px;
}

.floating-add-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.floating-add-button:hover {
    background-color: var(--md-sys-color-primary-container);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.floating-add-button:active {
    background-color: var(--md-sys-color-primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>