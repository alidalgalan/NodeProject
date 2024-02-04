const mongoose = require("mongoose");


const recordsModel = new mongoose.Schema({ title : { type : String }}) ;

module.exports = mongoose.model("recordsModel", recordsModel);