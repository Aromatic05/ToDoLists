<template>
    <div class="color-picker" v-if="show">
        <h3>{{ isDarkMode ? '深色背景' : '浅色背景' }}</h3>
        <div class="color-options">
            <div v-for="(color, index) in colors" :key="index" class="color-option" :style="{ background: color.value }"
                :class="{ active: currentColor === color.value }" @click="$emit('color-change', color.value)"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorPicker',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        colors: {
            type: Array,
            required: true
        },
        currentColor: {
            type: String,
            required: true
        },
        isDarkMode: {
            type: Boolean,
            default: false
        }
    },
    emits: ['color-change']
}
</script>

<style scoped>
.color-picker {
    position: fixed;
    left: 85px;
    bottom: 20px;
    width: 220px;
    padding: 18px;
    border-radius: 20px;
    background: var(--card-bg, rgba(255, 255, 255, 0.7));
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 99;
    animation: float-in 0.3s ease;
    transition: all 0.5s ease;
}

.color-picker h3 {
    margin-top: 0;
    margin-bottom: 14px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color-primary, #333);
    transition: color 0.5s ease;
}

.color-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.color-option {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.color-option:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.color-option.active {
    border: 2px solid #4285f4;
    transform: scale(1.05);
}

@keyframes float-in {
    from {
        transform: translateY(10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Dark mode styles */
:deep(.dark-mode) .color-picker {
    background: rgba(40, 40, 40, 0.85);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

:deep(.dark-mode) .color-picker h3 {
    color: #e1e2e5;
}
</style>