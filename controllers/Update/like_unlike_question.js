const handleLikeUnlikeQuestion = (db) => (req, res) => {

  const { userid, queid, like } = req.body;
  console.log(req.body);
	if(!userid || !queid){
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

  if(like){
    db('queupvotes')
    .returning('*')
    .insert({
      userid: userid,
      queid: queid
    })
    .then(data => {
      console.log(data);
      if(data.length>0){

        db('questions')
        .returning('upvotes')
        .where('queid', '=', queid)
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
      else{
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
  else{
    db('queupvotes')
      .where({
        'userid': userid,
        'queid': queid
      })
      .del()
      .then(data => {
        if(data>0){
          db('questions')
          .returning('upvotes')
          .where('queid', '=', queid)
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
        else{
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
    handleLikeUnlikeQuestion: handleLikeUnlikeQuestion
}
