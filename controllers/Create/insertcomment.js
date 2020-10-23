const handleInsertComment = (db) => (req, res) => {
    const { comment, ansid, userid } = req.body
    db('comments').insert({
        comment,
        ansid,
        userid
    }).then(() => {
        res.send('Comment added!!')
    })
        .catch(err => res.status(400).json('Some error occurred :('))
}

module.exports = {
    handleInsertComment
}