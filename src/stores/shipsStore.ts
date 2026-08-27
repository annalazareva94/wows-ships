import { fetchVehicles, fetchNations, fetchMedia, fetchVehicleTypes } from '../api'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLanguageStore } from './languageStore';

//этот стор хранит логику отображения кораблей, фильтров и поиска

export const useShipsStore = defineStore('ship', () => {

    interface Ship {
        name: string
        level: number
        nation: string
        tags: string[]
        code: string
        localization: {  
            mark: Record<string, string>   
            code: string 
        }
    }

    interface Nation {
        name: string
        code: string
        localization: { 
            mark: Record<string, string>
            code: string
        }
        icons: {     
            medium?: string;
            large?: string;
        }
    }

    interface VehicleType {
        localization: { 
            mark: Record<string, string>
        }
    }

    const ships = ref<Ship[]>([])
    const nations = ref<Record<string, Nation>>({})
    const types = ref<Record<string, VehicleType>>({})
    const mediaPath = ref('')
    const error = ref('')

    //для заглушки со скелетонами
    const isLoading = ref(false)
    
    // фильтры
    const selectedNation = ref('')
    const selectedType = ref('')
    const selectedLevel = ref('')
    const searchQuery = ref('')

    //при клике на карточку будет chosenShip.value
    //модалка будет брать даные из chosenShip
    const chosenShip = ref(null)

    const loadAllData = async () => {
        isLoading.value = true

        try {
            await Promise.all([
                loadShips(),
                loadNations(),
                loadTypes(),
                loadMedia()
            ]);
        } finally {
            isLoading.value = false
        }
        
    }
    
    //загрузка списка по апи
    const loadShips = async () => {
        try {
            const data = await fetchVehicles()
            ships.value = Object.values(data.data)
        } catch (e) {
            error.value = 'Не удалось загрузить корабли'
        }
    }

    //загрузка nations по апи
    const loadNations = async () => {
        try {
            const data = await fetchNations();
            const nationsObject: Record<string, any> = {};
            data.data.forEach((nation: any) => {
            nationsObject[nation.name] = nation;
            });
            nations.value = nationsObject
        } catch (e) {
            error.value = 'Не удалось загрузить nations';
        }
    }

    //загрузка types по апи
    const loadTypes = async () => {
        try {
            const data = await fetchVehicleTypes();
            types.value = data.data;
        } catch (e) {
            error.value = 'Не удалось загрузить типы кораблей'
        }
    }

    //загрузка медиа путь по апи
    const loadMedia = async () => {
        try {
            const data = await fetchMedia();
            mediaPath.value = data.data
        } catch (e) {
            error.value = 'Не удалось загрузить медиа'
        }
    }


    const resetFilters = () => {
        selectedNation.value = ''
        selectedType.value = ''
        selectedLevel.value = ''
        searchQuery.value = ''
    }

    //чтобы положить корабль в chosenShip
    const selectShip = (itership:any) => {
        chosenShip.value = itership
    }

    //функция, куда был вынесен повторяющийся код с searchQuery
    function filterBySearch(ships: Ship[], query: string) {

        if (!query) {
            return ships;
        }
        query = query.toLowerCase().trim();

        const langStore = useLanguageStore();   

        const lang = langStore.defaultLanguage

        

        return ships.filter(ship => {
            const nationData = nations.value[ship.nation];
            const nationName = nationData?.localization?.mark?.[lang] || nationData?.localization?.mark?.en || '';
            const nationMatch = nationName.toLowerCase().includes(query);

            const typeData = types.value[ship.tags[0]];
            const typeName = typeData?.localization?.mark?.[lang] || typeData?.localization?.mark?.en || '';
            const typeMatch = typeName.toLowerCase().includes(query);

            return  nationMatch || typeMatch;
        })

    }


    //возвращает корабли, отсортированные по разным критериям
    const filteredShipsList = computed(() => {
        let finalList = ships.value

        if (selectedNation.value) {
            finalList = finalList.filter(ship => ship.nation === selectedNation.value)
        }
        if (selectedType.value) {
            finalList = finalList.filter(ship => ship.tags[0] === selectedType.value)
        }
        if (selectedLevel.value) {
            finalList = finalList.filter(ship => String(ship.level) === selectedLevel.value)
        }
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()

            finalList = filterBySearch(finalList, query)
            
        }

        return finalList
    })

    const searchResults = computed(() => {
        return filterBySearch(ships.value, searchQuery.value)
    })

    
    return { 
        ships,
        nations,
        types,
        mediaPath,
        isLoading,
        error,
        selectedNation,
        selectedType,
        selectedLevel,
        searchQuery,
        chosenShip, 
        filteredShipsList,
        loadAllData,
        resetFilters,
        selectShip,
        searchResults
    }

    
})

