
const Files = require("../models/files");

const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new 
    ObjectId(id)).toString() === id; //true or false

exports.addFile = (req, res, next) => {
    // console.log(req.body);
    const file = new Files({
        ...req.body
    });
    file.save().then(() => {
        res.status(201).json({
            message: "File Added Successfully",
            
        });
    }).catch(e => {
        console.log(e)
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.deleteFile = (req, res, next) => {
    console.log(req.query)
    Files.deleteOne({ project_id: req.query.project_id,file_name:req.query.file_name }).then(result => {
        res.status(200).json({ message: "File Deleted!" });
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

exports.getAllFilesForProject = (req, res, next) => {

    console.log(req.params);
    Files.find({ project_id: req.params.id }).then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({ message: 'Files not found' })
        }
    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}
