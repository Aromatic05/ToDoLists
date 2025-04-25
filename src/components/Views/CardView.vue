<template>
    <div class="card-view-container">
        <div class="cards-scroll-container">
            <div class="cards-container">
                <transition-group name="card" tag="div" class="cards-wrapper" @before-enter="beforeEnter" @enter="enter"
                    @leave="leave">
                    <div v-for="(card, index) in cards" :key="card.id" class="card-wrapper" :data-index="index">
                        <BaseCard :data="card" @click="handleCardClick" />
                    </div>
                </transition-group>
            </div>
            <!-- Load more button -->
            <div v-if="hasMoreCards" class="load-more-container">
                <button class="load-more-button" @click="loadMoreCards">
                    {{ nextSetTitle }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseCard from '@/components/Cards/BaseCard.vue';
import CardDataService from '@/services/CardDataService';

export default {
    name: 'CardView',
    components: {
        BaseCard
    },
    props: {
        viewId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            cards: [],
            hasMoreCards: false,
            nextSetTitle: ''
        };
    },
    created() {
        this.loadCards();
    },
    watch: {
        viewId() {
            this.loadCards();
            CardDataService.resetViewState(this.viewId);
        }
    },
    methods: {
        loadCards() {
            this.cards = CardDataService.getCardsForView(this.viewId);
            this.hasMoreCards = CardDataService.hasMoreCards(this.viewId);
            this.nextSetTitle = CardDataService.getNextSetTitle(this.viewId);
        },
        loadMoreCards() {
            const nextCards = CardDataService.getNextCardsForView(this.viewId);
            this.cards = [...this.cards, ...nextCards];
            this.hasMoreCards = CardDataService.hasMoreCards(this.viewId);
        },
        handleCardClick(card) {
            this.$emit('card-click', card);
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
        },
        enter(el, done) {
            const delay = el.dataset.index * 20;
            setTimeout(() => {
                el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
                done();
            }, delay);
        },
        leave(el, done) {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = 0;
            el.style.transform = 'translateY(-20px)';
            setTimeout(done, 300);
        }
    }
};
</script>

<style scoped>
.card-view-container {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.cards-scroll-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.cards-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
    min-height: min-content;
    width: 100%;
}

.cards-wrapper {
    display: contents;
}

.card-wrapper {
    transition: all 0.3s ease;
    min-width: 0;
}

.load-more-container {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin-top: auto;
}

.load-more-button {
    padding: 12px 24px;
    border-radius: 8px;
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.load-more-button:hover {
    background: var(--md-sys-color-primary-container-hover);
    transform: translateY(-2px);
}

.card-enter-active,
.card-leave-active {
    transition: all 0.3s ease;
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
