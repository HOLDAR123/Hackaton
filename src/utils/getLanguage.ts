const getLanguage = (): string => {
    const storedLanguage = window.localStorage.getItem('lng')
    if (storedLanguage) return storedLanguage
    return navigator.language === 'ru-RU' ? 'ru' : 'en'
}

export default getLanguage
