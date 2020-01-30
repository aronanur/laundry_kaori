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
}

module.exports = Helper