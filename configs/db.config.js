const mongoose = require("mongoose");
const app_name = require("../package.json").name;
require('dotenv').config();
const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb://localhost/${app_name}`;
  console.log('MONGODBURI',MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
    process.exit(1);
  });
//