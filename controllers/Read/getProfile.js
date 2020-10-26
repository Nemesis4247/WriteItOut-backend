const handlegetProfile = (db) => (req, res) => {
    db.select('*').from('users')
        .where({
            userid: req.params.id
        }).then(user => {
            res.json(user[0])
        }).catch(err => res.status(400).json('Some error occurred :('))
}

module.exports = {
    handlegetProfile: handlegetProfile
}