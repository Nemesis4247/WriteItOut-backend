const handleLikedQuestions = (db) => (req, res) => {

  const { userid } = req.body;

	if(!userid){
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

  db('queupvotes')
  .select('queid')
  .where('userid', '=', userid)
  .then((data) => {
    var all_que_ids = []
    for (var i = 0; i < data.length; i++) {
      all_que_ids.push(data[i]['queid'])
    }
    return res.status(200)
             .json(
               {
                  'status': true,
                  'data': {
                    'message': all_que_ids
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
    handleLikedQuestions: handleLikedQuestions
}
