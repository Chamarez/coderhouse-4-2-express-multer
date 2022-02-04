const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


//Crear express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const routes = require('./routes/routes')
app.use("/", routes)
app.use("/static", express.static(path.join(__dirname, "public")))
//Start server
app.listen(3000, () =>{
    console.log("listening at port:3000")
})

