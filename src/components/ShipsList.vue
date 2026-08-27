<template>
    <div class="ships-list">
        <!-- заглушка, пока не загрузтся карточки с данными о кораблях -->
        <ShipCardSkeleton 
            v-if="shipsStore.isLoading" 
            v-for="n in shipsAmount" 
            :key="n" 
        />

        <ShipCard
            v-else
            v-for="itership in displayedShips"
            :ship="itership"
            @select="shipsStore.selectShip"
        />
    </div>
    <button
        class="load-more"
        @click="shipsAmount += 15"
        v-if="shipsAmount < shipsStore.filteredShipsList.length"
    >
        {{ languageStore.la('show_more') }}
    </button>

</template>

<script setup lang="ts">
    import ShipCardSkeleton from '../components/ShipCardSkeleton.vue'
    import { useShipsStore } from '../stores/shipsStore';
    import { useLanguageStore } from '../stores/languageStore'
    import ShipCard from './ShipCard.vue';
    import {ref, computed, onMounted} from 'vue';

    const shipsStore = useShipsStore()
    const languageStore = useLanguageStore()

    onMounted(() => {
        shipsStore.loadAllData();
    });

    //переменная для отображения определенного кол-ва кораблей 
    // и подгрузки определенного кол-ва кораблей по кнопке "показать еще"
    const shipsAmount = ref(12)

    const displayedShips = computed(() => {
        const list = shipsStore.filteredShipsList;
        return list.slice(0, shipsAmount.value);
    });

</script>

<style lang="scss">
    :root {
    --button-transparent-5: rgba(255, 255, 255, 0.24);
    }

    .ships-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 15px;
        grid-row-gap: 15px;
        z-index: 4;
        position: relative;
        margin-top: 50px;


        @media (max-width: 1100px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 700px) {
            grid-template-columns: 1fr;
        }

    }

    .load-more {
        cursor: pointer;
        display: flex;
        margin: 30px auto;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 24px #0000001a, 0 0 2px #00000040 inset;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 10px 24px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 900;
        --button-transparent-5: rgba(255, 255, 255, 0.24);
        border: 1px solid var(--button-transparent-5);
        transition: background-color 0.3s ease;
    }

    .load-more:hover {
        color: #FFFFFF;
        background-color: rgba(255, 255, 255, 0.08);
    }

</style>