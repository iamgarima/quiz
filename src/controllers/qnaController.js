const Quiz = require("../models/questions");

const generateRandomQidList = async n => {
    try {
        const count = await Quiz.getRowCount("questions");
        const randomList = [];
        while (randomList.length !== n) {
            const val = Math.ceil(Math.random() * count);
            if (randomList.indexOf(val) === -1) {
                randomList.push(val);
            }
        }
        return randomList;
    } catch (err) {
        console.log("Error while fetching questions count"); // eslint-disable-line no-console
        throw err;
    }
};

const getQuestions = async (req, res) => {
    try {
        const qIdList = await generateRandomQidList(req.body.count);
        const result = await Quiz.getQuestionsWithOptions(qIdList);
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAnswers = async (req, res) => {
    try {
        const result = await Quiz.getAnswersForQuestions(req.body.qIdList);
        res.send(result);
    } catch (err) {
        res.send(500);
    }
};

module.exports = {
    getQuestions,
    getAnswers
};
