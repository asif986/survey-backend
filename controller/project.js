
const Project = require("../models/project");

exports.createProject = (req, res, next) => {
    console.log(req.body);
    const project = new Project({
        ...req.body
    });
    project.save().then(createdProject => {
        res.status(201).json({
            message: "Project added successfully",
            post: {
                ...createdProject,
                postId: createdProject._id

            }
        });
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.getProjectsById = (req, res, next) => {

    console.log(req.params);
    Project.find({ user_id: req.params.id ,project_status:'In Progress'}).then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'Projects not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.getCompletedProjectsById = (req, res, next) => {

    console.log(req.params);
    Project.find({ user_id: req.params.id ,project_status:'Completed'}).then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'Projects not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}
