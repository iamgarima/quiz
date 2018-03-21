const Quiz = require('../models/questionsP');

// NodeJS uses CommonJS Module syntax (module.exports) not ES6 module syntax (export keyword).
// export const getAnswers = (req, res) => {
const getAnswers = (req, res) => {
    let qIdList = req.body.qIdList.concat();
    let ansList = [];
    let count = 0;
    let fillAnsList = new Promise((resolve, reject) => {
        qIdList.forEach(qId => {    // try doing this using Promise.all
            Quiz.getAnswers(qId).then(result => {
                ansList.push(result[0]);
                ++count;
                if(count === qIdList.length) {
                    resolve(ansList);
                }
            });
        })
    })
    fillAnsList.then(ansList => res.send(ansList));
}


module.exports = {
    getAnswers
}