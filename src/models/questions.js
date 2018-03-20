const db = require('../db');

function getQuestions(cb) {
    db.query('Select * from questions;', (err, result) => {
        if(err) {
            cb(err, null)
        } else {
            temp1(result.rows, finalRes => {
                // do something finalRes
                cb(null, finalRes);
            })
            // temp1(result.rows, cb);
        }
    })
};

function temp1(result, cb) {
    let newResult = [];
    result.forEach(ques => {
        temp(ques.options, arr => {
            ques.options = arr;
            newResult.push(ques);
            if(newResult.length === result.length) {
                cb(newResult);
            }
        });
    })
}

function temp(options, cb) {
    let arr = [];
    options.forEach((option) => {
        checkOption(option, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                arr.push(result);
            }
            if(arr.length === options.length) {
                cb(arr);
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

