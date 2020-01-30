class Helper {

    static formValidator(object){
        let error = []

        object.map(obj => {
            error.push(obj.message)
        })

        return error
    }

}

module.exports = Helper