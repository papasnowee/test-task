export function prettifyNumber(number: number) {
    const digits = number.toString().split('')
    const formatted = []
    let digitCount = 0

    for (let i = digits.length - 1; i >= 0; i--) {
        formatted.unshift(digits[i])
        digitCount++
        if (digitCount === 3 && i !== 0) {
            formatted.unshift(' ')
            digitCount = 0
        }
    }

    return formatted.join('')
}
