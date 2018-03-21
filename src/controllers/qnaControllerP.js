const Quiz = require('../models/questionsP');

const getQuestions = (req, res) => {
    Quiz.getQuestions()
}


// NodeJS uses CommonJS Module syntax (module.exports) not ES6 module syntax (export keyword).
// export const getAnswers = (req, res) => {
// const getAnswers = (req, res) => {
//     let qIdList = req.body.qIdList.concat();
//     let ansList = [];
//     let count = 0;
//     let fillAnsList = new Promise((resolve, reject) => {
//         qIdList.forEach(qId => {    // try doing this using Promise.all
//             Quiz.getAnswer(qId).then(result => {
//                 ansList.push(result[0]);
//                 ++count;
//                 if(count === qIdList.length) {
//                     resolve(ansList);
//                 }
//             }).catch(err => {
//                 console.log('Error happened in getAnswer contoller: ', err);
//                 res.send(err);
//             });
//         })
//     })
//     fillAnsList.then(ansList => res.send(ansList));
// }


// second implementation of getAnswers using Promise.all
const getAnswers = (req, res) => {
    let qIdList = req.body.qIdList.concat();
    let promList = [];

    qIdList.forEach(qId => promList.push(Quiz.getAnswer(qId)));

    Promise.all(promList)
    .then(ansList => res.send(ansList))
    .catch(err => {
        console.log('Error happened in getAnswer contoller: ', err);
        res.send(err);
    });
}



module.exports = {
    getAnswers
}