const Ques = require('../models/questions');

exports.getQuestions = (req, res) => {
    if(req.user) {
        Ques.getQuestions((err, result) => {
            if(err) {
                res.send('Error!!!', err);
            }
            res.send(result);
        });
    } else {
        res.send('Please login first');
    }
}

exports.getAnswers = (req, res) => {
    //if(req.session.userId) {
    if(req.user) {    
        Ques.getAnswers((err, result) => {
            if(err) {
                res.send('Error!!!', err);
            }
            // console.log('I am the user\'s email id', req.user.email);
            res.send(result);
        });
    } else {
        res.send('Login first');
    }
}