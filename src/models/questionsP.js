const db = require('../db/indexP');


const getAnswer = (qId) => {
    return db.query('Select * from solutions where qId=$1', [qId])
            .then(result => result.rows[0])
            .catch(err => {
                console.log('Error happened in getAnswers model: ', err);
                return err;
            })
}


module.exports = {
    getAnswer
}