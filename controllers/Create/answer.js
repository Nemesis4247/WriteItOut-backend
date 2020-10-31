const handleAnswer = (db) => (req, res) => {
    const { ans, queid, userid } = req.body
    db('answers')
    .returning('*')
    .insert({
        ans,
        queid,
        userid
    }).then(ans => {
        res.status(200)
        .json(
          {
            'status': true,
            'data': {
              'ansid': ans[0].ansid
            }
          }
        );
    })
        .catch(err => res.status(400).json('Some error occurred :('))
}

module.exports = {
    handleAnswer
}