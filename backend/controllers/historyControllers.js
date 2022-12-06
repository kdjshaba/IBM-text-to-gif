const giphy = require('../modules/giphy');
const watson = require('../modules/watson-nlu');
const history = require('../modules/history-db')

//Get Gif URL from string and post a search log to db
const getGifUrl = async (req, res) => {

  try{
    const category = await watson.textCategory(req.body.text);
    const gifUrl = await giphy.getGif(category);
    res.json({gifUrl, category});
    const log = history.addHistory(gifUrl, req.user._id, category);
  } catch(err){
    err = await watson.checkErr(err)
    res.status(400).json({ error: err.message })
  }

}

//Get all history logs from db
const getAllLogs = async (req, res) => {
  
  try{
    const logs = await history.getLogs(req.user._id)
    res.json(logs)
  } catch(err){
    res.status(400).json({ error: err.message })
  }

}

module.exports = {getGifUrl, getAllLogs}