'use strict'
function formatRupiah(number) {
    let string = String(number)
    let reverse = string.split('').reverse().join('')

    let stringReverse = ''
    for (let i = 0; i < reverse.length; i++) {
        stringReverse += reverse[i]
        if ((i + 1) % 3 == 0 && i !== reverse.length - 1) {
            stringReverse += '.'
        }
    }
    let toConvert = stringReverse.split('').reverse().join('')
    return `Rp. ${toConvert}`
}
// console.log(convertToRupiah(1200000))
module.exports = formatRupiah