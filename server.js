var express = require('express')
  ,http = require('http')
  ,fs = require('fs')
  ,path = require('path')
  ,cors = require("cors");

  const PORT = 3000;

var app = express();

var corsOptions = {
    origin: "http://localhost:"+PORT
  };
  
app.use(cors(corsOptions));
  
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/*app.get('/movies',function(req,res){
    res.send("All Movies Data in JSON format from Mongo DB")
})

app.get('/genres',function(req,res){
    res.send("All Genres Data in JSON format from Mongo DB")
})

app.get('/artists',function(req,res){
    res.send("All Artists Data in JSON format from Mongo DB")
})
*/
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to Upgrad Movie booking application development.",
    });
  });

  require("./routes/movie.routes")(app);
require("./routes/artist.routes")(app);
require("./routes/genre.routes")(app);

app.listen(PORT, function () {
    console.log("express has started on port ", PORT);
  });


   