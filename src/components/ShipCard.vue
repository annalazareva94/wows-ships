<template>
    <div class="ship-card" :class="{ flipping: isFlipping }" @click="handleClick">
        <div class="card-inner">
            <div class="card-front">
                <img 
                    :src="imageUrl" 
                    loading="lazy" 
                    alt="ship icon" 
                />
                <div class="ship-card-info">
                    <div>
                        <span class="level">{{ toRoman(ship.level) }}</span>
                        <span class="name">{{ ship.localization.mark[languageStore.defaultLanguage] || ship.localization.mark.en }}</span>
                        <span class="type">
                            {{
                                shipsStore.types[ship.tags[0]]?.localization?.mark?.[languageStore.defaultLanguage]
                                || shipsStore.types[ship.tags[0]]?.localization?.mark?.en
                                || ship.tags[0]
                            }}
                        </span>
                    </div>
                    <span class="nation">
                        {{
                            shipsStore.nations[ship.nation]?.localization?.mark?.[languageStore.defaultLanguage]
                            || shipsStore.nations[ship.nation]?.localization?.mark?.en
                            || ship.nation
                        }}
                    </span>
                    
                </div>
            </div>

            <div class="card-back">
                <img src="../assets/img/anchor-icon.svg" loading="lazy" alt="anchor icon" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useShipsStore } from '../stores/shipsStore'
    import { useLanguageStore } from '../stores/languageStore'
    import { toRoman } from '../utils/roman'
    import { computed, ref, watch} from 'vue'

    const shipsStore = useShipsStore()
    const languageStore = useLanguageStore()

    const props = defineProps(['ship'])
    const imageUrl = computed(() => {
        return shipsStore.mediaPath + props.ship.icons.medium;
    });

    const isFlipping = ref(false);

    const handleClick = () => {
        //защита от повторного клика во время анимации
        if (isFlipping.value) {
            return
        }
        
        isFlipping.value = true;

        setTimeout(() => {
            shipsStore.selectShip(props.ship);
        }, 200);
    };

    watch(
        () => shipsStore.chosenShip,
        (newVal) => {
            if (!newVal) {
            isFlipping.value = false;
        }
    }
);

</script>

<style>
    .ship-card {
        perspective: 1200px;
        cursor: pointer;
        padding: 10px;
        position: relative;
        width: 100%;
        height: 280px;
        display: flex;
        flex-direction: column;
        column-gap: 22px;
        /* для теста стиля */
        /* background: #17191b; */
        /* background: rgba(255, 255, 255, 0.05); */
        border-radius: 3px;
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .ship-card::before {
        content: "";
        position: absolute;
        inset: 0;
        height: 100%;
        background: rgba(255, 255, 255, 0.09);
        backdrop-filter: blur(25px);
        z-index: -1;
        -webkit-mask-image: linear-gradient(to bottom right, black 40%, transparent 65%);
        mask-image: linear-gradient(to bottom right, black 40%, transparent 65%);
    }

    .ship-card img {
        max-width: 400px;
        width: 100%;
        margin: auto;
        object-fit: cover;
        display: block;
    }

    .ship-card:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.2);
        border-color: rgba(255, 215, 0, 0.5);
    }

    .ship-card-info {
        color: rgba(255, 255, 255, 0.8);
        gap: 20px;
        display: flex;
        justify-content: space-between;
    }

    .ship-card-info div {
        display: flex;
        gap: 9px;
    }

    /* блок, который вращается */
    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 1.3s cubic-bezier(0.23, 1, 0.32, 1);
        transform-style: preserve-3d;
    }

    .ship-card.flipping .card-inner {
        transform: rotateY(180deg) scale(1.1);
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 3px;
    }

    .card-front {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .card-back {
        transform: rotateY(180deg);
        background: #252f43;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.8);
        font-size: 18px;
        border: 1px solid rgba(255, 215, 0, 0.3);
        
    }

    .card-back img {
        max-width: 50px;
    }

    .ship-card:hover:not(.flipping) .card-front {
        transform: translateY(-6px) scale(1.02);
        /* box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.2); */
        border-color: rgba(255, 215, 0, 0.5);
    }

    .ship-card-info .level {
        color: #AD7A07;
    }


</style>