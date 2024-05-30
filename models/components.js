const mongoose = require('mongoose');

const Componentschema = mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
 
});

module.exports = mongoose.model('Component', Componentschema);