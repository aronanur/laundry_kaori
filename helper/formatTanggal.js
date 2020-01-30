'use strict'

function formatTanggal(date) {
    return date.split('T')[0]
}
// console.log(formatTanggal('2020-01-29 21:27:52.734+07'))

module.exports = formatTanggal