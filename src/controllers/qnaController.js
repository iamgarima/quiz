const Quiz = require("../models/questions");

const generateRandomQidList = n =>
    Quiz.getRowCount("questions")
        .then(count => {
            const randomList = [];
            while (randomList.length !== n) {
                const val = Math.ceil(Math.random() * count);
                if (randomList.indexOf(val) === -1) {
                    randomList.push(val);
                }
            }
            return randomList;
        })
        .catch(err => console.log("Error")); // eslint-disable-line no-console

const getQuestions = (req, res) => {
    generateRandomQidList(req.body.count).then(qIdList => {
        Quiz.getQuestionsWithOptions(qIdList)
            .then(result => res.send(result))
            .catch(err => res.send(500));
    });
};

const getAnswers = (req, res) => {
    Quiz.getAnswersForQuestions(req.body.qIdList)
        .then(result => res.send(result))
        .catch(err => res.send(500));
};

module.exports = {
    getQuestions,
    getAnswers
};
