const handleQuestion = (db) => (req, res) => {
    db.select('*').from('questions')
        .join('users', 'questions.userid', '=', 'users.userid')
        .where({
            queid: req.params.id
        }).then(ques => {
            return getanswer(db, ques[0])
        }).then(obj => { res.json(obj) })
        .catch(err => res.status(400).json('Some error occurred :('))
}

const getanswer = (db, ques) => {
    return db.select('*').from('answers')
        .join('users', 'answers.userid', '=', 'users.userid')
        .where({ queid: ques.queid })
        .orderBy('upvotes', 'desc')
        .orderBy('datetime', 'desc')
        .then(ans => {
            console.log(ans)
            return comments(db, ans)
        }).then(ans => {
            const obj = {
                que: ques.que,
                name: ques.name,
                description: ques.description,
                answers: ans
            }
            console.log(obj)
            return obj
        })
}

const comments = (db, ans) => {
    return db.select('*').from('comments')
        .join('users', 'comments.userid', '=', 'users.userid')
        .whereIn('ansid', ans.map(a => a.ansid))
        .then(comms => {
            console.log('comments : ', typeof ans)
            Array.prototype.forEach.call(ans, a => {
                a.comments = []
                Array.prototype.forEach.call(comms, c => {
                    if (c.ansid === a.ansid) {
                        a.comments.push(c);
                    }
                });
            });
            return ans;
        })
}

module.exports = {
    handleQuestion: handleQuestion
}