const Quiz = require('../models/questionsP');

const generateRandomQidList = n => {
    return Quiz.getRowCount('questions').then(count => {
        let randomList = [];
        while(randomList.length !== n) {
            let val = Math.ceil(Math.random() * count);
            if(randomList.indexOf(val) === -1) {
                randomList.push(val);
            }
        }
        return randomList;
    })
} 

const getQuestions = (req, res) => {
    let quesList = [];
    generateRandomQidList(req.body.count)
        .then(qIdList => {

            qIdList.forEach(qId => quesList.push(Quiz.getQuestion(qId)));

            Promise.all(quesList)
                .then(quesList => {
                        let updatedQuesList = [];
                        quesList.forEach(ques => {

                            let optionsTextList = [];
                            let updatedQues = new Promise((resolve, reject) => {
                                
                                ques.options.forEach(optionId => optionsTextList.push(Quiz.getOptionText(optionId)));

                                Promise.all(optionsTextList)
                                    .then(optionsTextList => {
                                        ques.options = optionsTextList; 
                                        resolve(ques)
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });

                            })

                            updatedQuesList.push(updatedQues);

                        })
                        
                        Promise.all(updatedQuesList)
                            .then(updatedQuesList => res.send(updatedQuesList))
                            .catch(err => res.send(err));

                }).catch(err => {
                    console.log('Error happened in getQuestions controller: ', err);
                    res.send(err);
                });

        });

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
};



module.exports = {
    getQuestions,
    getAnswers
}