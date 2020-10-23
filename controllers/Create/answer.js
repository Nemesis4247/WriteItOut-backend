const handleAnswer = (db) => (req, res) => {
    const { ans, queid, userid } = req.body
    db('answers').insert({
        ans,
        queid,
        userid
    }).then(() => {
        res.send('Answer added!!')
    })
        .catch(err => res.status(400).json('Some error occurred :('))
}

module.exports = {
    handleAnswer
}