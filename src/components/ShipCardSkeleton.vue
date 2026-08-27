<template>
    <div class="skeleton-ship-card">
        <!-- картинка -->
        <div class="skeleton-img"></div>
        <span class="skeleton-info"></span>
    </div>
</template>

<script setup lang="ts">

</script>

<style>

    :root {
    --button-transparent-5: rgba(255, 255, 255, 0.24);
    }

    .skeleton-ship-card {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 280px;
        border: 1px solid var(--button-transparent-5);
        padding: 10px;
    }

    .skeleton-img,
    .skeleton-info {
        background-color: rgba(255, 255, 255, 0.15);
        animation: pulse 1.5s ease-in-out infinite;
    }

    .skeleton-img {
        height: 90%;
    }

    .skeleton-info {
        height: 18px;
    }

    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }

</style>