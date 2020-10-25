const handleAddQuestion = (db) => (req, res) => {

  const { question, question_tags, userid } = req.body;

	if(!question){
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

  var tag_str = "";
  for (var i = 0; i < question_tags.length; i++) {
    if(i == question_tags.length-1){
      tag_str = tag_str + question_tags[i]
    }
    else {
      tag_str = tag_str + question_tags[i] + "#"
    }
  }


  db('questions')
  .returning('*')
  .insert({
    que: question,
    tags: tag_str,
    userid: userid,
    datetime: new Date()
  })
  .then(data => {
    if(data.length>0){
      res.status(200)
             .json(
               {
                  'status': true,
                  'data': {
                    'message': data[0]
                  }
               }
             );
    }
    else{
      res.status(200)
             .json(
               {
                  'status': false,
                  'data': {
                    'message': 'Unable to add question'
                  }
               }
             );
    }
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
  })
}

module.exports = {
    handleAddQuestion: handleAddQuestion
}
