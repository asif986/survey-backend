
const Project = require("../models/project");
const District = require("../models/district");
const Taluka = require("../models/taluka");
const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new 
    ObjectId(id)).toString() === id; //true or false

exports.createProject = (req, res, next) => {
    console.log(req.body);
    const project = new Project({
        ...req.body
    });
    project.save().then(createdProject => {
        res.status(201).json({
            message: "Project Added Successfully",
            project: {
                ...createdProject,
            }
        });
    }).catch(e => {
        console.log(e)
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.getProjectsByUserId = (req, res, next) => {

    if (!validateObjectId(req.params.id)) {
        // throw Error("Invalid object Id")
        return res.status(401).json({
            message: 'User not found'
        });
      }
      Project.aggregate(
        [
            {
                $match: {
                  user_id: new mongoose.Types.ObjectId(req.params.id),
                  project_status:'In Progress'
                },
              },
            {
              $lookup: {
                from: "talukas",
                localField: "taluka_id",
                foreignField: "taluka_id",
                as: "taluka_info",
              },
            },
            {
              $unwind: {
                path: "$taluka_info",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "districts",
                localField: "distrct_id",
                foreignField: "district_id",
                as: "district_info",
              },
            },
            {
              $unwind: {
                path: "$district_info",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
          "$addFields": 
            { "taluka_name": "$taluka_info.taluka_name",
            "district_name" :"$district_info.district_name"
            },
            } 
          ]
    ).exec((err, projects) => {
        console.log(err)
        if (err) {
            res.status(401).json({
                message: 'Something went wrong'
            });
        }else{
            res.status(200).json(projects);
        }
    });

    
/*
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
    */
}

exports.getCompletedProjectsById = (req, res, next) => {


    if (!validateObjectId(req.params.id)) {
        // throw Error("Invalid object Id")
        return res.status(401).json({
            message: 'User not found'
        });
      }
      Project.aggregate(
        [
            {
                $match: {
                  user_id: new mongoose.Types.ObjectId(req.params.id),
                  project_status:'Completed'
                },
              },
            {
              $lookup: {
                from: "talukas",
                localField: "taluka_id",
                foreignField: "taluka_id",
                as: "taluka_info",
              },
            },
            {
              $unwind: {
                path: "$taluka_info",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "districts",
                localField: "distrct_id",
                foreignField: "district_id",
                as: "district_info",
              },
            },
            {
              $unwind: {
                path: "$district_info",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
          "$addFields": 
            { "taluka_name": "$taluka_info.taluka_name",
            "district_name" :"$district_info.district_name"
            },
            } 
          ]
    ).exec((err, projects) => {
        console.log(err)
        if (err) {
            res.status(401).json({
                message: 'Something went wrong'
            });
        }else{
            res.status(200).json(projects);
        }
    });
    /*
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
*/
}

exports.getDistrict = (req, res, next) => {
    
    District.find().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'District not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}
exports.getTalukaByDistrictId = (req, res, next) => {
    console.log(req.params);
    Taluka.find({district_id: req.params.id }).then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'Taluka not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.deleteProject = (req, res, next) => {
    Project.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ message: "Project Deleted!" });
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}
