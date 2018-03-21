const User = require('../models/usersP');

const addUser = (req, res) => {
    User.addUser(req.body.username, req.body.password)  // why passing email as username here
        .then(result => res.send(result))
        .catch(err => {
            console.log('Error in addUser controller');
            res.send(err);
        });    // how error will happen here ?
}

/* No need for this function */
// export const getUser = (req, res) => {
//     User.getUserGivenEmail(req.body.username)
//         .then(result => {
//             if(result.rows.length === 0) {
//                 res.send('User not found, signup first');
//             } else {
//                 if(result.rows[0].password !== req.body.password) {
//                     res.send('Incorrect password');
//                 } else {
//                     res.send('You are logged in successfully');
//                 }
//             }
//         })
//         .catch(err => {
//             console.log('Error in getUser controller');
//             res.send(err);
//         });
// }


module.exports = {
    addUser
}