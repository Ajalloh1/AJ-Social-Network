const mongoose = require('mongoose');
const express = require("express");
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));

app.use(routes);
//connecting mongose///
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/AJ-Social-Network",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,  }
);

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
