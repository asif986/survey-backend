const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    scheme_name: { type: String, required: true },
    distrct: { type: String, required: true },
    talkua: { type: String, required: true },
    saction_year: { type: String, required: true },
    source: { type: String, required: true },
    time_limit: { type: String, required: true },
    scheme_capacity: { type: String, required: true },
    project_status: { type: String, required: true ,default:"In Progress"},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Project', projectSchema);