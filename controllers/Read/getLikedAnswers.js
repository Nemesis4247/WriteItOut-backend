const handleLikedAnswers = (db) => (req, res) => {

    const { userid } = req.body;

    if (!userid) {
        return res.status(400)
            .json(
                {
                    'status': false,
                    'data': {
                        'message': 'Could not find the userid.'
                    }
                }
            );
    }

    db('ansupvotes')
        .select('ansid')
        .where('userid', '=', userid)
        .then((data) => {
            var all_ans_ids = []
            for (var i = 0; i < data.length; i++) {
                all_ans_ids.push(data[i]['ansid'])
            }
            return res.status(200)
                .json(
                    {
                        'status': true,
                        'data': {
                            'message': all_ans_ids
                        }
                    }
                );
        })
        .catch(err => {
            return res.status(400)
                .json(
                    {
                        'status': false,
                        'data': {
                            'message': err
                        }
                    }
                );
        })
}

module.exports = {
    handleLikedAnswers: handleLikedAnswers
}
