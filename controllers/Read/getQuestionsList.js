const handleQuesList = (db) => (req, res) => {
    return db.select('*').from('questions')
        .join('users', 'questions.userid', '=', 'users.userid')
        .then(ques => {
            console.log(ques)
            res.json(ques)
        })
        .catch(err => res.status(400).json('Some error occurred :('))
}


module.exports = {
    handleQuesList: handleQuesList
}