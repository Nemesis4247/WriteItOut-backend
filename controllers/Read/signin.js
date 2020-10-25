const handleSignin = (db, bcrypt) => (req, res) => {
  
  const { email, password } = req.body;

	if(!email || !password){
		return res.status(400)
           .json(
             {
                'status': false,
                'data': {
                  'message': 'Incorrect form Submission !!!'
                }
             }
           );
	}

  db('users')
  .select()
  .where('email', '=', email)
  .then((data) => {
    if (data.length == 0) {
      return res.status(200)
             .json(
               {
                  'status': false,
                  'data': {
                    'message': 'Email not valid!'
                  }
               }
             );
    }
    else {
      bcrypt.compare(password, data[0].password, function(err, response) {
        if (!response) {
          return res.status(200)
                 .json(
                   {
                      'status': false,
                      'data': {
                        'message': 'Password not valid!'
                      }
                   }
                 );
        }
        else {
        return res.status(200)
                 .json(
                   {
                      'status': true,
                      'data': {
                        'message': data[0]
                      }
                   }
                 );
        }
      });
    }
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
    handleSignin: handleSignin
}
