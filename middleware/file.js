const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);

    }

})

module.exports = multer({ storage: storage }).single("image");


function abc(cb) {
    //business-logic
    console.log('abc -callback');
    cb();
}

abc(xyz);

function xyz() {

    console.log('hi');
}


let events = require('events');

let em = new events.EventEmitter();


em.on('FirstEvent', (data) => {
    console.log('Subscriber', data);
});

em.emit('FirstEvent');






