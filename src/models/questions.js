const db = require("../db");

const getQuestion = id =>
    new Promise((resolve, reject) => {
        db
            .query("Select * from questions where id=$1", [id])
            .then(result => resolve(result.rows[0]))
            .catch(err => {
                console.log("Error happened in getQuestion: ", err);  // eslint-disable-line no-console
                reject(err);
            });
    });

const getAnswer = qId =>
    new Promise((resolve, reject) => {
        db
            .query("Select * from solutions where qId=$1", [qId])
            .then(result => resolve(result.rows[0]))
            .catch(err => {
                // need to give catch either in model or controller
                console.log("Error happened in getAnswers model: ", err);  // eslint-disable-line no-console
                reject(err);
            });
    });

const getRowCount = tableName =>
    new Promise((resolve, reject) => {
        db
            .query(`select count(*) from ${tableName};`, [])
            .then(count => resolve(Number(count.rows[0].count)))
            .catch(err => {
                console.log("Error happened in getRowCount: ", err);  // eslint-disable-line no-console
                reject(err);
            });
    });

const getOptionText = optionId =>
    new Promise((resolve, reject) => {
        db
            .query("Select * from options where id=$1", [optionId])
            .then(optionText => resolve(optionText.rows[0]))
            .catch(err => {
                console.log("Error happened in getOptionText: ", err);  // eslint-disable-line no-console
                reject(err);
            });
    });

const getQuestionsWithOptions = qIdList =>
    new Promise((resolve, reject) => {
        const quesListExec = [];

        qIdList.forEach(qId => quesListExec.push(getQuestion(qId)));

        Promise.all(quesListExec)
            .then(quesList => {
                const updatedQuesListExec = [];
                quesList.forEach(ques => {
                    const optionsTextListExec = [];
                    const updatedQues = new Promise(
                        (resolveInner, rejectInner) => {
                            ques.options.forEach(optionId =>
                                optionsTextListExec.push(
                                    getOptionText(optionId)
                                )
                            );

                            Promise.all(optionsTextListExec)
                                .then(optionsTextList => {
                                    ques.options = optionsTextList;
                                    resolveInner(ques);
                                })
                                .catch(err => {
                                    rejectInner(err);
                                });
                        }
                    );

                    updatedQuesListExec.push(updatedQues);
                });

                Promise.all(updatedQuesListExec)
                    .then(updatedQuesList => resolve(updatedQuesList))
                    .catch(err => reject(err));
            })
            .catch(err => {
                console.log(                                                    // eslint-disable-line no-console
                    "Error happened in getQuestionswithOptions model: ",
                    err
                ); 
                reject(err);
            });
    });

const getAnswersForQuestions = qIdList =>
    new Promise((resolve, reject) => {
        const promList = [];

        qIdList.forEach(qId => promList.push(getAnswer(qId)));

        Promise.all(promList)
            .then(ansList => resolve(ansList))
            .catch(err => {
                console.log(                                                // eslint-disable-line no-console
                    "Error happened in getAnswersForQuestions model: ",
                    err
                ); 
                reject(err);
            });
    });

module.exports = {
    getAnswer,
    getQuestion,
    getRowCount,
    getOptionText,
    getQuestionsWithOptions,
    getAnswersForQuestions
};
