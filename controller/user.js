const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/user');

exports.createNewUser = (req, res, next) => {

    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {

        const user = new User({
             ...req.body,
            password: hash
        });

        user.save().then(result => {

            res.status(201).json({
                message: 'User created successfully',
                result: result
            });

        }).catch(err => {

                if(err.name =='ValidationError'){
                    err.message ='User Already Exists.'
                }
            res.status(401).json({
               message:err.message
            });
        })
    })

}

exports.loin =  (req, res, next) => {
    let fetchedUser;
    console.log(req.body);
    User.findOne({ user_id: req.body.user_id }).then(user => {
        if (user == null) {
            return res.status(401).json({
                message: 'User Not Exists'
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Wrong password'
            });
        }
        // process.env.SECRET_KEY
        const token = jwt.sign({ email: fetchedUser.user_id, userId: fetchedUser._id },'survey123' , {
            expiresIn: "1hr",
        });
       return res.status(200).json({
            token: token,
            user_id:fetchedUser._id,
            expiresIn: 3600
        })

    }).catch(e => {
        // console.log('e',e)
    //    return res.status(401).json({
    //         message: 'Auth failed'
    //     });
    })
}


exports.getUserInformation =  (req, res, next) => {
   
    User.findOne({ _id: req.params.id }).then(user => { 

        if (!user) {
            return res.status(401).json({
                message: 'User Not Exists'
            })
        }
         user.password= undefined;
        console.log(user)
        return user
    }).then(result => {
        res.status(200).json(
            result
        )

    }).catch(e => {
        res.status(401).json({
            message: 'Something went wrong'
        });
    })
}

