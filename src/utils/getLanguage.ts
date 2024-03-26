const getLanguage = (): string => {
    const storedLanguage = window.localStorage.getItem('lng')
    if (storedLanguage) return storedLanguage
    return navigator.language === 'ru-RU' ? 'en' : 'ru' 
}

export default getLanguage
