const fbModel = require('../models/feedbackModel');

let getFeedback = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fb = '';
            if(Id === '*'){
                fb = await fbModel.find({})
            }
            if(Id && Id !== '*'){
                fb = await fbModel.findOne({
                    _id: Id
                })
            }
            resolve(fb)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getFeedback,  
}