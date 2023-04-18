export function formatNumber(number: number) {
    // Преобразуем число в строку и разбиваем его на массив
    const digits = number.toString().split("");
    // Создаем новый массив для отформатированной строки
    const formatted = [];
    // Переменная для отслеживания количества цифр
    let digitCount = 0;

    // Идем по циклу справа налево, чтобы правильно форматировать числа,
    // которые меньше 1000, например 123, а не 123 000
    for (let i = digits.length - 1; i >= 0; i--) {
        // Добавляем текущую цифру в массив форматированной строки
        formatted.unshift(digits[i]);
        // Увеличиваем переменную digitCount
        digitCount++;
        // Если digitCount достигает 3, то добавляем пробел и обнуляем digitCount
        if (digitCount === 3 && i !== 0) {
            formatted.unshift(" ");
            digitCount = 0;
        }
    }

    // Объединяем массив в строку и возвращаем результат
    return formatted.join("");
}
