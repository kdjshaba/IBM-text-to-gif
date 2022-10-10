const giphy = require('../modules/giphy');
const watson = require('../modules/watson-nlu');
const history = require('../modules/history-db')

//Get Gif URL from string and post a search log to db
const getGifUrl = async (req, res) => {

  try{
    const category = await watson.textCategory(req.body.text);
    const gifUrl = await giphy.getGif(category);
    const log = await history.addHistory(gifUrl);
    res.json({"gifUrl" : gifUrl});
  } catch(err){
    err = await watson.checkErr(err)
    res.status(400).json({ error: err.message })
  }

}

//Get all history logs from db
const getAllLogs = async (req, res) => {
  
  try{
    const logs = await history.getLogs()
    res.json(logs)
  } catch(err){
    res.status(400).json({ error: err.message })
  }

}

module.exports = {getGifUrl, getAllLogs}