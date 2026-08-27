<template>

    <div class="info-container">
        <img :src="imageUrl" loading="lazy" alt="ship icon" class="ship-image"/>
        <h2>{{ toRoman(ship.level) }} {{ ship.localization.mark[languageStore.defaultLanguage] || ship.localization.mark.en }}</h2>
         <img v-if="flagUrl" :src="flagUrl" alt="flag" class="flag-icon"/>
        <p>{{ ship.localization.description[languageStore.defaultLanguage] || ship.localization.description.en }}</p>
    </div>

</template>

<script setup lang="ts">
    import { useShipsStore } from '../stores/shipsStore'
    import { useLanguageStore } from '../stores/languageStore'
    import { toRoman } from '../utils/roman'
    import { computed } from 'vue'

    const shipsStore = useShipsStore()
    const languageStore = useLanguageStore() 


    const props = defineProps({
        ship: { type: Object, required: true },
    })

    const imageUrl = computed(() => {
        return shipsStore.mediaPath + props.ship.icons.medium;
    });

    const flagUrl = computed(() => {
        const nation = shipsStore.nations[props.ship.nation];
        if (!nation) return null;

        const path = nation.icons?.large;
            if (!path) return null;

            return shipsStore.mediaPath + path;
    });


</script>

<style>
    .ship-image {
        width: 100%;

        z-index: 2;
        position: relative;
    }

    .info-container h2 {
        justify-content: center;
        display: flex;
        margin-bottom: 20px;
    }

    .info-container p {
        text-align: justify;
    }

    .flag-icon {
        position: absolute;
        top: 5%;
        left: 4%;
        width: 60%;
        opacity: 0.7;
        z-index: 1;
    }

</style>