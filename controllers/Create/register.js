const handleRegister = (db, bcrypt) => (req, res) => {

  console.log(req.body)

  const { userid, name, email, password, year, branch, description, imagePath } = req.body;

  if (!name || !email || !password || !userid || !year || !branch) {
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

  var passwordHash = bcrypt.hashSync(password);
  console.log("passwordHash: ", passwordHash);

  db('users')
    .returning('*')
    .insert({
      userid: userid,
      name: name,
      email: email,
      password: passwordHash,
      year: year,
      branch: branch,
      description: description,
      profilepic: imagePath
    })
    .then(user => {
      res.status(200)
        .json(
          {
            'status': true,
            'data': {
              'message': user[0]
            }
          }
        );
    })
    .catch(err => {
      res.status(400)
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
  handleRegister: handleRegister
}
