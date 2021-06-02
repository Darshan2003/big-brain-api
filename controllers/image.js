const { json } = require('body-parser');
const Clarifai = require('clarifai')
const app =new Clarifai.App({
  apiKey:'12b55ddd7be642e9a31d7c8e19828f1e'
})
const handleApiCall=(req, res)=>{

  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>{res.json(data);})
  .catch(err=>res.status(400).json('unable to work with API'))
}
    
handleImage=(req, res, db)=>{
    const { id } = req.body;
  
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
   
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}