<script setup>
</script>

<template>
    <div class="loader flex justify-center items-center z-100 overflow-hidden">
        <svg class="animation-scale" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
            <g fill="none" stroke="#0bff25" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
                    <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                </path>
                <path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
                </path>
            </g>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    width: 50%;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.animation-scale {
    animation: scaleAnimation 1.5s infinite ease-in-out; /* Добавляем анимацию */
}

@keyframes scaleAnimation {
    0%, 100% {
        transform: scale(1); /* Начальный размер */
    }
    50% {
        transform: scale(1.2); /* Увеличиваем на 20% */
    }
}
</style>