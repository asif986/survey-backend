const mongoose = require('mongoose');

const surveStoreSchema = mongoose.Schema({
    // required: true 
    surveyData: {type : String,},
    project_id: {  type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('SurveyStore', surveStoreSchema);