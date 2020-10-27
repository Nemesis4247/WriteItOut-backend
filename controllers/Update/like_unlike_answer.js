const handleLikeUnlikeAnswer = (db) => (req, res) => {

    const { userid, ansid, like } = req.body;
    console.log(req.body);
    if (!userid || !ansid) {
        return res.status(400)
            .json(
                {
                    'status': false,
                    'data': {
                        'message': 'Incorrect form submission'
                    }
                }
            );
    }

    if (like) {
        db('ansupvotes')
            .returning('*')
            .insert({
                userid: userid,
                ansid: ansid
            })
            .then(data => {
                console.log(data);
                if (data.length > 0) {

                    db('answers')
                        .returning('upvotes')
                        .where('ansid', '=', ansid)
                        .increment('upvotes', 1)
                        .then(upvotes => {
                            return res.status(200)
                                .json(
                                    {
                                        'status': true,
                                        'data': {
                                            'message': data[0],
                                            'upvotes': upvotes[0]
                                        }
                                    }
                                );
                        })
                        .catch(err => {
                            res.status(200)
                                .json(
                                    {
                                        'status': false,
                                        'data': {
                                            'message': err
                                        }
                                    }
                                );
                        });
                }
                else {
                    return res.status(200)
                        .json(
                            {
                                'status': false,
                                'data': {
                                    'message': "Could not change status."
                                }
                            }
                        );
                }
            })
            .catch(error => {
                return res.status(200)
                    .json(
                        {
                            'status': false,
                            'data': {
                                'message': error
                            }
                        }
                    );
            })
    }
    else {
        db('ansupvotes')
            .where({
                'userid': userid,
                'ansid': ansid
            })
            .del()
            .then(data => {
                if (data > 0) {
                    db('answers')
                        .returning('upvotes')
                        .where('ansid', '=', ansid)
                        .decrement('upvotes', 1)
                        .then(upvotes => {
                            return res.status(200)
                                .json(
                                    {
                                        'status': true,
                                        'data': {
                                            'message': data,
                                            'upvotes': upvotes[0]
                                        }
                                    }
                                );
                        })
                        .catch(err => {
                            res.status(200)
                                .json(
                                    {
                                        'status': false,
                                        'data': {
                                            'message': err
                                        }
                                    }
                                );
                        });
                }
                else {
                    return res.status(200)
                        .json(
                            {
                                'status': false,
                                'data': {
                                    'message': data
                                }
                            }
                        );
                }
            })
            .catch(error => {
                return res.status(400)
                    .json(
                        {
                            'status': false,
                            'data': {
                                'message': error
                            }
                        }
                    );
            })
    }
}

module.exports = {
    handleLikeUnlikeAnswer: handleLikeUnlikeAnswer
}
