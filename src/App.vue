<template>

    <div class="app-layout">
        <AppHeader />
        <main class="main-content">
            <router-view />
        </main>
        
    </div>

</template>

<script setup lang="ts">
    import AppHeader from './components/AppHeader.vue';
    import { useLanguageStore } from './stores/languageStore'

    const languageStore = useLanguageStore();
    languageStore.defineLanguage()


</script>

<style>
    .main-content {
        width: 100%;
        margin: auto;
        padding: 0 20px;
    }
</style>