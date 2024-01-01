let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const route = require("./routes/route");
let app = express();
app.use(express.json());
app.use(cors());
app.use("/imgs", express.static("./prodimgs"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/ecomtask")
  .then(() => {
    console.log("ok");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", route);
app.listen(5000);
