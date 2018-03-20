const db = require('./index');

let text = 'CREATE TABLE IF NOT EXISTS options (id SERIAL PRIMARY KEY, text TEXT ); \
CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, text TEXT, options INTEGER[] ELEMENT REFERENCES options(id) ); \
CREATE TABLE IF NOT EXISTS solutions (qId INTEGER REFERENCES questions(id), ansId INTEGER REFERENCES options(id));'

db.query(text, [], (err, result) => {
    if(err) {
        console.log(err);
        return err;
    }
    return result;
})

// db.query('', [options], (err, result) => {
//     if(err) {
//         console.log(err);
//         return err;
//     }
//     return result;
// })

// db.query('', [questions], (err, result) => {
//     if(err) {
//         console.log(err);
//         return err;
//     }
//     return result;
// })

// db.query('', [solutions], (err, result) => {
//     if(err) {
//         console.log(err);
//         return err;
//     }
//     return result;
// })


insert into options (text) values ('Arun Jaitley');
insert into options (text) values ('Nirmala Sitharaman');
insert into options (text) values ('Narendra Modi');
insert into options (text) values ('Ram Nath Kovind');
insert into questions (text, options) values('Who is the prime minister of India?', '{1, 2, 3, 4}');
insert into questions (text, options) values('Who is the president of India?', '{1, 2, 3, 4}');
insert into questions (text, options) values('Who is the finance minister of India?', '{1, 2, 3, 4}');
insert into questions (text, options) values('Who is the defense minister of India?', '{1, 2, 3, 4}');
insert into solutions (qId, ansId) values(1, 3);
insert into solutions (qId, ansId) values(2, 4);
insert into solutions (qId, ansId) values(3, 1);
insert into solutions (qId, ansId) values(4, 2);



