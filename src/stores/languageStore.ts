import en from '../locales/en.json'
import ru from '../locales/ru.json'
import uk from '../locales/uk.json'
import { ref } from 'vue'
import { defineStore } from 'pinia'

//этот стор хранит логику переключения языков

export const useLanguageStore = defineStore('lang', () => {

    const translations: Record<string, any> = { en, ru, uk };

    const availableLanguages = ['en', 'ru', 'uk']


    const defaultLanguage = ref('en')

    const setLanguage = (language: string) => {

        if (availableLanguages.includes(language)) {
            defaultLanguage.value = language
            //для того чтобы браузер запомнил выбор
            localStorage.setItem('defaultLanguage', language)
        }
    }


    const defineLanguage = () => {

        const savedLang = localStorage.getItem('defaultLanguage')

        if (savedLang && availableLanguages.includes(savedLang)) {
            defaultLanguage.value = savedLang
            return
        }

        // проверка языка пользователя из браузера
        const browserLang = navigator.language?.split('-')[0] || 'en'

        if (availableLanguages.includes(browserLang)) {
            defaultLanguage.value = browserLang
        } else {
            defaultLanguage.value = 'en'
        }

    }


    const la = (key: string): string => {
        const lang = defaultLanguage.value || 'en';
        return translations[lang]?.[key] || key;
    };


    return { 
        defaultLanguage,
        setLanguage, 
        defineLanguage, 
        la 
    }

})

