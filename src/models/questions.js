const db = require("../db");

const getQuestion = async id => {
    try {
        const result = await db.query("Select * from questions where id=$1", [
            id
        ]);
        return result.rows[0];
    } catch (err) {
        console.log("Error happened in getQuestion: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getAnswer = async qId => {
    try {
        const result = await db.query("Select * from solutions where qId=$1", [
            qId
        ]);
        return result.rows[0];
    } catch (err) {
        console.log("Error happened in getAnswers model: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getRowCount = async tableName => {
    try {
        const count = await db.query(`select count(*) from ${tableName};`, []);
        return Number(count.rows[0].count);
    } catch (err) {
        console.log("Error happened in getRowCount: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getOptionText = async optionId => {
    try {
        const optionText = await db.query("Select * from options where id=$1", [
            optionId
        ]);
        return optionText.rows[0];
    } catch (err) {
        console.log("Error happened in getOptionText: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getQuestionsWithOptions = async qIdList => {
    const quesListExec = [];
    qIdList.forEach(qId => quesListExec.push(getQuestion(qId)));
    try {
        const quesList = await Promise.all(quesListExec);
        const updatedQuesListExec = [];
        quesList.forEach(ques => {
            const optionsTextListExec = [];
            const updatedQues = new Promise((resolve, reject) => {
                ques.options.forEach(optionId =>
                    optionsTextListExec.push(getOptionText(optionId))
                );
                Promise.all(optionsTextListExec)
                    .then(optionsTextList => {
                        ques.options = optionsTextList;
                        resolve(ques);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
            updatedQuesListExec.push(updatedQues);
        });
        const updatedQuesList = await Promise.all(updatedQuesListExec);
        return updatedQuesList;
    } catch (err) {
        console.log(                                                   // eslint-disable-line no-console
            "Error happened in getQuestionswithOptions model: ",
            err
        );
        throw err;
    }
};

const getAnswersForQuestions = async qIdList => {
    const promList = [];

    qIdList.forEach(qId => promList.push(getAnswer(qId)));

    try {
        const ansList = await Promise.all(promList);
        return ansList;
    } catch (err) {
        console.log("Error happened in getAnswersForQuestions model: ", err); // eslint-disable-line no-console
        throw err;
    }
};

module.exports = {
    getAnswer,
    getQuestion,
    getRowCount,
    getOptionText,
    getQuestionsWithOptions,
    getAnswersForQuestions
};
