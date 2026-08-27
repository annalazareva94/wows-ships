<template>

    <header :class="{ scrolled: isScrolled }">
        <a href="https://worldofwarships.eu/" target="_blank">
            <img src="../assets/img/logo.svg" loading="lazy" alt="logo icon"  class="header-logo"/>
        </a>

        <div class="language-container">
            <img src="../assets/img/language.svg" loading="lazy" alt="language icon" class="language-icon"/>
            <div>
                <select 
                    class="filter-select"
                    v-model="languageStore.defaultLanguage" 
                    @change="languageStore.setLanguage(($event.target as HTMLSelectElement).value)"
                >
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                    <option value="uk">Українська</option>
                </select>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useLanguageStore } from '../stores/languageStore'

    const languageStore = useLanguageStore()
    const isScrolled = ref(false);

    const handleScroll = () => {
        isScrolled.value = window.scrollY > 50;
    };


    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

</script>

<style lang="scss">
    header {
        position: sticky;
        top: 0;
        height: 85px;
        z-index: 5;
        display: flex;
        align-items: center;
        padding: 0 20px;
        background: linear-gradient(180deg, #000000a3 0%, #0000003d 51.5%, #00000000 100%);
        background-color: transparent;
        justify-content: space-between;
    }

    .header-logo {
        filter: invert(1);

        @media (max-width: 430px) {
            max-width: 200px;
        }
    }

    header::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, #000000a3 36%, #0000003d 78.5%, #00000000 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
        pointer-events: none;
    }

    header.scrolled::after {
        opacity: 1;
    }
    
    .language-container {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    header .filter-select {
        padding: 10px 40px 10px 24px;
    }

    .language-icon {

        @media (max-width: 500px) {
            display: none;
        }
    }

</style>