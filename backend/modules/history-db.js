const HistoryLog = require('../models/historyModel');
const mongoose = require('mongoose');

// Add new log to db
const addHistory = async (gifUrl, user_id) => {
    console.log(user_id)
    try{
        const history = await HistoryLog.create({gifUrl, user_id});
        console.log('added new history log: ', history);
    } catch (error){
        console.log('Error, could not add new history log to db: ', error.message)
    }

    deleteLogIfTooMuch(user_id)
};

// Get all logs from db
const getLogs = async (user_id) => {
    const logs = await HistoryLog.find({ user_id }).sort({createdAt: -1})
    return(logs)
}

// Delete log if there's more than 5
const deleteLogIfTooMuch = async (user_id) => {
    logs = await getLogs(user_id);
    if (logs[5]){
        const logDeleted = await HistoryLog.findOneAndDelete({_id: logs[5]._id})
        console.log('Too many logs, this log is deleted: ', logDeleted)
    }
    else{
        console.log('No logs have been deleted')
    }
}

module.exports = { addHistory, getLogs }