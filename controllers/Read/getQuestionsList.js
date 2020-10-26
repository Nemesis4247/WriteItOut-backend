const handleQuesList = (db) => (req, res) => {

  db.select('queid', 'que', 'upvotes', 'tags', 'datetime', 'questions.userid', 'name', 'description', 'imagepath')
  .from('questions')
  .innerJoin('users', 'users.userid', 'questions.userid')
  .orderBy('datetime', 'desc')
  .then(data => {
      return res.status(200)
             .json(
               {
                  'status': true,
                  'data': {
                    'message': data
                  }
               }
             );
  })
  .catch(err => {
    return res.status(200)
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


module.exports = {
    handleQuesList: handleQuesList
}
