const handleQuestion = (db) => (req, res) => {
    db.select('*').from('questions')
        .where({
            queid: req.params.id
        }).then(ques => {
            return getanswer(db, ques[0])
        }).then(obj => { res.json(obj) })
        .catch(err => res.status(400).json('Some error occurred :('))
}

const getanswer = (db, ques) => {
    return db.select('*').from('answers')
        .where({ queid: ques.queid })
        .then(ans => {
            console.log(ans)
            return comments(db, ans)
        }).then(ans => {
            const obj = {
                que: ques.que,
                answers: ans
            }
            console.log(obj)
            return obj
        })
}

const comments = (db, ans) => {
    return db.select('*').from('comments')
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