const db = require('../db/indexP');

const getAnswers = (qId) => {
    return db.query('Select * from solutions where qId=$1', [qId])
            .then(result => result.rows)
            .catch(err => {
                console.log('Error happened in getAnswers model: ', err);
                return err;
            })
}


module.exports = {
    getAnswers
}