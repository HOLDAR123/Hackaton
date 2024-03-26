export default function getContrastColor(hexColor: string) {
    // Преобразовываем hex-код цвета в RGB формат
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Вычисляем яркость цвета по формуле
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Если яркость больше половины максимального значения, возвращаем черный цвет, иначе - белый
    return brightness > 128 ? '#000000' : '#FFFFFF';
}