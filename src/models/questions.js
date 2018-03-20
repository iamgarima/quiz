const db = require('../db');

function getQuestions(cb) {
    db.query('Select * from questions;', (err, result) => {
        if(err) {
            cb(err, null)
        } else {
            updateExistingQuestionOptions(result.rows, cb);
        }
    })
};

function updateExistingQuestionOptions(questions, cb) {
    let updatedQuestions = [];

    questions.forEach(ques => {
        getOptionsTextGivenId(ques.options, updatedOptions => {

            ques.options = updatedOptions;

            updatedQuestions.push(ques);

            if(updatedQuestions.length === questions.length) {
                cb(null, updatedQuestions);
            }

        });
    })

}

function getOptionsTextGivenId(options, cb) {
    let updatedOptions = [];

    options.forEach((option) => {
        checkOption(option, (err, fetchedOption) => {
            
            if(err) {
                console.log(err);
            } else {
                updatedOptions.push(fetchedOption);
            }

            if(updatedOptions.length === options.length) {
                cb(updatedOptions);
            }

        });
    })

}

function checkOption(id, cb) {
    db.query('Select * from options where id=$1;', [id], (err, result) => {
        if(err) {
            cb(err, null);
        } else {
            cb(null, result.rows[0]);
        }
    })
}

function getAnswers(cb) {
    db.query('Select * from solutions;', (err, result) => {
        if(err) {
            cb(err, null);
        } else {
            cb(null, result.rows);
        }
    })
}

module.exports = {
    getQuestions,
    getAnswers
}

