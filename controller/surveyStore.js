const SurveyStore = require("../models/surveyStore");
const Project = require("../models/project");


exports.createSurveyStore = (req, res, next) => {
    // console.log(req.body);
    const surveyStore = new SurveyStore({
        ...req.body
    });
    surveyStore.save().then(surveystore => {

        Project.updateOne({ _id: surveystore.project_id }, {project_status:'Completed'}).then(res1 => {
            //   console.log(res1);
            // res.status(200).json({ message: 'project update successfully' });
    
        });

        res.status(201).json({
            message: "Survey Completed Successfully.",
            
                surveystore
            
        });
    }).catch(e => {
        console.log(e)
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.getCompletedSurveyByProjectId = (req, res, next) => {

    console.log(req.params);
    SurveyStore.findOne({ project_id: req.params.id }).then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'Survey report not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}
