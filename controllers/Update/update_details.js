const handleUpdateDetails = (db) => (req, res) => {
  console.log(req.body);
  const { name, imagePath, year, branch, description, userid } = req.body;

  db('users')
  .returning('*')
  .where('userid', '=', userid)
  .update({
    name: name,
    imagepath: imagePath,
    year: year,
    branch: branch,
    description: description
  })
  .then((data) => {
    console.log(data);
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
    handleUpdateDetails: handleUpdateDetails
}
