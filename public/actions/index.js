import axios from 'axios';


exports.getQuestions = n => {
    return axios.post('/quiz/questions', { count : n })
            .then(res => {
                return res.data;
            })
            .catch(err => alert(err));
}

exports.getAnswers = qIdList => {
    return axios.post('/quiz/solutions', { qIdList : qIdList })
            .then(res => {
                return res.data;
            })
            .catch(err => alert(err));
}