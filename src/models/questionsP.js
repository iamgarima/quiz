const db = require('../db/indexP');

const getQuestion = id => {
    return db.query('Select * from questions where id=$1', [id])
            .then(result => result.rows[0])
            .catch(err => {
                console.log('Error happened in getQuestion: ', err);
                return err;
            })
}

const getAnswer = qId => {
    return db.query('Select * from solutions where qId=$1', [qId])
            .then(result => result.rows[0])
            .catch(err => {         // need to give catch either in model or controller
                console.log('Error happened in getAnswers model: ', err);
                return err;
            })
}


const getRowCount = tableName => {
    return db.query(`select count(*) from ${tableName};`, [])
            .then(count => {
                console.log('jmk', count);
                return Number(count.rows[0].count);
            })
            .catch(err => {
                console.log('Error happened in getRowCount: ', err);
                return err;
            })
}


const getOptionText = (optionId) => {
    return db.query('Select * from options where id=$1', [optionId]).then(optionText => {
                return optionText.rows[0];
            })
            .catch(err => {
                console.log('Error happened in getOptionText: ', err);
                return err;
            })
}

module.exports = {
    getAnswer,
    getQuestion,
    getRowCount,
    getOptionText
}