<template>
    <div class="setting-view-container">
        <div class="settings-main-container">
            <div class="settings-scroll-container">
                <div class="cards-container">
                    <transition-group name="card" tag="div" class="cards-wrapper" @before-enter="beforeEnter"
                        @enter="enter" @leave="leave">
                        <div v-for="(card, index) in cards" :key="card.id" class="card-wrapper" :data-index="index">
                            <SettingCard :data="card" @click="handleCardClick" />
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
            <!-- 添加 setting-content -->
            <div class="setting-content">
                <!-- 右侧内容 -->
                <p>这里是右侧的设置内容</p>
            </div>
        </div>
    </div>
</template>

<script>
import SettingCard from '@/components/Cards/SettingCard.vue';
import CardDataService from '@/services/CardDataService';

export default {
    name: 'SettingView',
    components: {
        SettingCard
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
.setting-view-container {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
}

.settings-main-container {
    display: flex;
    flex: 1;
    gap: 20px;
    /* padding: 20px; */
    height: 100%;
}

.settings-scroll-container {
    flex: 1;
    overflow-y: scroll;
    /* 改为 scroll 确保始终有滚动条空间 */
    display: flex;
    flex-direction: column;
    margin-right: -20px;
    /* 向右偏移隐藏滚动条 */
    padding-right: 20px;
    /* 补偿内容区域 */
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

.setting-content {
    display: flex;
    width: 400px;
    min-width: 400px;
    height: 96%;
    background: var(--md-sys-color-surface-container);
    border-radius: 12px;
    padding: 16px;
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--md-sys-color-outline) var(--md-sys-color-surface);
    border: 1px solid var(--md-sys-color-outline);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
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