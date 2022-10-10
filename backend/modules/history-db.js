const HistoryLog = require('../models/historyModel');
const mongoose = require('mongoose');

// Add new log to db
const addHistory = async (gifUrl) => {
    try{
        const history = await HistoryLog.create({gifUrl: gifUrl});
        console.log('added new history log: ', history);
    } catch (error){
        console.log('Error, could not add new history log to db: ', error.message)
    }

    deleteLogIfTooMuch()
};

// Get all logs from db
const getLogs = async () => {
    const logs = await HistoryLog.find({}).sort({createdAt: -1})
    return(logs)
}

// Delete log if there's more than 5
const deleteLogIfTooMuch = async () => {
    logs = await getLogs();
    if (logs[5]){
        const logDeleted = await HistoryLog.findOneAndDelete({_id: logs[5]._id})
        console.log('Too many logs, this log is deleted: ', logDeleted)
    }
    else{
        console.log('No logs have been deleted')
    }
}

module.exports = { addHistory, getLogs }