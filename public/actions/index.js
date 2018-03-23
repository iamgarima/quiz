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

exports.addUser = (username, password) => {
    return axios.post('/signup', { 
        username: username,
        password: password
     }).then(res => {
         return res.data;
     }).catch(err => alert(err));
}

exports.checkUser = (username, password) => {
    return axios.post('/login', { 
        username: username,
        password: password
     }).then(res => {
         if(res.data === true)  {
             return true;
         } else {
            alert(res.data);
         }
     }).catch(err => alert(err));
}