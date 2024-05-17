const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    scheme_name: { type: String, required: true },
    distrct_id: { type: String, required: true },
    taluka_id: { type: String, required: true },
    resolution_no:{ type: String, required: true },
    village_name: { type: String, required: true },
    distance_from_district:{ type: String, required: true },
    average_rain_fall:{ type: String, required: true },
    population_of_village:{ type: String, required: true },
    lpcd_capacity:{ type: String, required: true },
    saction_year: { type: String, required: true },
    source: { type: String, required: true },
    Villages_and_Habitations_covered: { type: String, required: true },
    Technical_approval_date:{ type: String, required: true },
    Administrative_approval_date:{ type: String, required: true },
    Work_Order_date:{ type: String, required: true },
    Total_Budget_estimate:{ type: String, required: true },
    Budget_spent:{ type: String, required: true },
    Implementation_agency:{ type: String, required: true },
    time_limit: { type: String, required: true },
    scheme_capacity: { type: String, required: true },
    project_status: { type: String, required: true ,default:"In Progress"},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Project', projectSchema);
