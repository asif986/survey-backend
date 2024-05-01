const mongoose = require('mongoose');

const talukaSchema = mongoose.Schema({
    taluka_name: { type: String, required: true },
    taluka_id: { type: String, required: true },
    district_id: { type: String, required: true },
 
});

module.exports = mongoose.model('Taluka', talukaSchema);