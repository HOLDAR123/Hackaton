import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'hooks/store'

function LangInitializer() {
    const { i18n } = useTranslation()
    const language = useAppSelector((state) => state.settings.language)

    useEffect(() => {
        window.localStorage.setItem('lng', language)
        i18n.changeLanguage(language).then().catch()
    }, [language])

    return null
}

export default LangInitializer
