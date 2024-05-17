const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    // required: true 
    geoaddress:{type:String },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    file_name:{type:String },
    imgBaseURL:{type:String}

});

module.exports = mongoose.model('files', fileSchema);