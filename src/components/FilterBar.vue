<template>
    <div class="filter-block">
        
        <input
            v-model="shipsStore.searchQuery"
            type="text"
            :placeholder="languageStore.la('search_placeholder')"
            class="filter-search"
        />

        <button 
            class="filter-toggle" 
            :class="{ active: showFilters }"  
            @click="toggleFilters"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

        <Transition name="filter-slide">
            <div class="filters-wrapper" v-if="showFilters">
                <select 
                    v-model="shipsStore.selectedNation" 
                    class="filter-select"
                    :class="{ 'filter-active': shipsStore.selectedNation !== '' }"
                >
                    <option value="">{{ languageStore.la('all_nations') }}</option>
                    <option
                        v-for="nation in availableNations"
                        :key="nation.id"
                        :value="nation.id"
                    >
                        {{ nation.name }}
                    </option>
                </select>

                <select 
                    v-model="shipsStore.selectedLevel" 
                    class="filter-select"
                    :class="{ 'filter-active': shipsStore.selectedLevel !== '' }"
                >
                    <option value="">{{ languageStore.la('all_levels') }}</option>
                    <option
                        v-for="level in availableLevels"
                        :value="String(level)"
                    >
                        {{ toRoman(level) }}
                    </option>
                </select>

                <select 
                    v-model="shipsStore.selectedType" 
                    class="filter-select"
                    :class="{ 'filter-active': shipsStore.selectedType !== '' }"
                >
                    <option value="">{{ languageStore.la('all_types') }}</option>
                    <option
                        v-for="type in availableTypes"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{
                            shipsStore.types[type.id]?.localization?.mark?.[languageStore.defaultLanguage]
                            || shipsStore.types[type.id]?.localization?.mark?.en
                            || type.id
                        }}
                    </option>
                </select>

                <button @click="shipsStore.resetFilters" class="filter-reset">
                    {{ languageStore.la('reset_filters') }}
                </button>
            </div>
        </Transition>

    </div>


</template>

<script setup lang="ts">
    import { useShipsStore } from '../stores/shipsStore'
    import { useLanguageStore } from '../stores/languageStore'
    import { toRoman } from '../utils/roman'
    import { computed,ref, onMounted, onUnmounted } from 'vue';

    const shipsStore = useShipsStore()
    const languageStore = useLanguageStore()

    const showFiltersMobile = ref(false);
    const isDesktop = ref(window.innerWidth >= 769);

    const showFilters = computed(() => {
        return isDesktop.value ? true : showFiltersMobile.value;
    });


    const toggleFilters = () => {
        if (!isDesktop.value) {
            showFiltersMobile.value = !showFiltersMobile.value;
        }
    };

    const updateDesktop = () => {
        isDesktop.value = window.innerWidth >= 769;
        if (isDesktop.value) {
            showFiltersMobile.value = false;
        }
    };

    onMounted(() => {
        window.addEventListener('resize', updateDesktop);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateDesktop);
    });


    //функции для получения наций среди найденных по поиску кораблей, 
    // чтобы в селектах выводился список толкьо доступных наций
    const availableNations = computed(() => {
        const list = shipsStore.searchResults;
        const newList = new Set(list.map(ship => ship.nation));
        const lang = languageStore.defaultLanguage;
        return Array.from(newList).map(code => {
            const nationData = shipsStore.nations[code];
            const name = nationData?.localization?.mark?.[lang] 
                        || nationData?.localization?.mark?.en 
                        || code;
            return { id: code, name };
        });
        });

    //аналогично нациям. для селектов
    const availableTypes = computed(() => {
        const list = shipsStore.searchResults;
        const newList = new Set(list.map(ship => ship.tags[0]))
        const typesArray = Array.from(newList).map(code => {
        const typesData = shipsStore.types[code];
            return {
                id: code,
                name: typesData?.localization?.mark?.en || code
            };
        });
        return [...typesArray];
        })

    //аналогично нациям
    const availableLevels = computed(() => {
        const list = shipsStore.searchResults;
        const levelsSet = new Set(list.map(ship => ship.level));
        return Array.from(levelsSet).sort((a, b) => a - b);
    });

</script>

<style lang="scss">
    :root {
        --button-transparent-5: rgba(255, 255, 255, 0.24);
    }

    .filter-block {
        position: sticky;
        /* столько, сколько px у хэдера */
        top: 105px;
        gap: 20px;
        z-index: 5;
        display: flex;
        justify-content: center;
        width: 85%;
        margin: auto;

        padding: 14px 0;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(175, 185, 195, 0.18) 15%,
            rgba(175, 185, 195, 0.22) 50%,
            rgba(175, 185, 195, 0.18) 85%,
            transparent 100%
        );

        backdrop-filter: blur(30px);

        border-top: 1px solid rgba(200, 205, 210, 0.25);
        border-bottom: 1px solid rgba(200, 205, 210, 0.25);


        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;

        @media (max-width: 1070px) {
            flex-wrap: wrap;
        }
    }

    .filter-search {
        padding: 12px 24px;
    }

    .filter-toggle {
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        padding: 8px;
    }

    .filter-toggle span {
        display: block;
        width: 24px;
        height: 2px;
        background: #fff;
        border-radius: 2px;
        transition: 0.3s;
    }

    .filter-reset:hover {
        color: #FFFFFF;
        background-color: rgba(255, 255, 255, 0.08);
    }

    select.filter-active {
        background-color: rgba(255, 215, 0, 0.6);
    }

    input[type="text"]::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }

    input[type="text"]::-webkit-input-placeholder {
        color: #FFFFFF;
        opacity: 0.3;
    }

    .filter-toggle span {
        display: block;
        width: 24px;
        height: 2px;
        background: #fff;
        border-radius: 2px;
        transition: 0.3s;
    }

    .filter-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(4px, 4px);
    }
    .filter-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    .filter-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(4px, -4px);
    }

    .filter-slide-enter-active,
    .filter-slide-leave-active {
        transition: max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
        overflow: hidden;
    }

    .filter-slide-enter-from,
    .filter-slide-leave-to {
        max-height: 0;
        opacity: 0;
        transform: translateY(-10px);
    }

    .filter-slide-enter-to,
    .filter-slide-leave-from {
        max-height: 500px;
        opacity: 1;
        transform: translateY(0);
    }

    .filters-wrapper {
        display: flex;
        align-items: center;
        gap: 12px
    }


@media (max-width: 768px) {
    .filter-toggle {
        display: flex;
    }

    .filters-wrapper {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
        transition: all 0.3s ease;
        overflow: hidden;
    }

    .filter-select,
    .filter-reset {
        flex: 1 1 calc(50% - 8px);
        min-width: 0;
    }

    .filter-reset {
        flex: 1 1 100%;
        max-width: 215px;
    }
}

@media (max-width: 480px) {
    .filter-select {
        flex: 1 1 100%;
        max-width: 215px;
    }
}

</style>