const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
app.use(cors());
// app.use(express.json());


// get driver connection
//const dbo = require("./db/conn");


// app.listen(port, () => {
//   // perform a database connection when server starts
  

  
//   console.log(`Server is running on port: ${port}`);
// });


mongoose.connect("mongodb+srv://<Username>:<Password>@cluster0.i7vqtw0.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

const recordsModel = require("./models/recordsmodel");
// const recordsmodel = require("./models/recordsmodel");

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("connected to database"));

app.use(express.json());

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

const GetAll = async (req,res) => {
    let records;
    try{
        records = await recordsModel.find();  //.findById("65bd2f0e35eae502cd88e9c3");
        console.log(records);
    }
    catch(err){
        console.error(err);       
    }

    res.recordsData = records;
    res.json(res.recordsData);
}

async function GetRecordById(req,res){
    let records;
    try{
        records = await recordsModel.findById(req.params.id);  
        console.log(records);
    }
    catch(err){
        console.error(err);       
    }

    res.recordsData = records;
    res.json(res.recordsData);
}


async function CreateNewItem(req,res){
    const {title} = req.body;
    console.log("TITLE VAR : ",title);
   
    const record = new recordsModel({ title });

    await record.save().then(res.json({successMessage : "item successfully inserted to the list."})).catch((err) => res.json({ errorMessage : err }));

}



async function FindItemByTitle(req,res){
    var rec = await recordsModel.find({title:/test/});    

    res.titleData = rec;
    res.json(res.titleData);   
}


app.get("/api/findbytitle",FindItemByTitle);
app.get("/api/getall", GetAll);
app.get("/api/GetById/:id", GetRecordById);
app.post("/records/insert",CreateNewItem);


