class Helper {

    static formValidator(object){
        let error = []

        object.map(obj => {
            error.push(obj.message)
        })

        return error
    }

    static generatePayCode(id){
        let date = Date.now().toString() + id
        return date
    }

    static sumTotalPrice(object){
        let jumlah = 0

        object.map(el => {
            jumlah += el.total_price
        })

        return jumlah
    }

    static checkoutValidasi(object){
        let total = 0

        object.map(el => {
            if(el.status === 'Belum Lunas'){
                return total++
            }
        })

        return total
    }
}

module.exports = Helper