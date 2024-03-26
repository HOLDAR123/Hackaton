import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import getLanguage from 'utils/getLanguage'
import ruTranslation from './ru/translation.json'
import enTranslation from './en/translation.json'

export const resources = {
    ru: {
        translation: ruTranslation,
    },
    en: {
        translation: enTranslation,
    },
} as const

const lng = getLanguage()

i18n.use(initReactI18next).init({
    lng,
    interpolation: { escapeValue: false },
    contextSeparator: '_',
    resources,
})

export default i18n
