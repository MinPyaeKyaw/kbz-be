const express = require('express')
const app = express();
var cors = require('cors');
app.use(cors());

require('dotenv').config();

require("./models/db");

const path = require("path")

const categoryRoute = require("./routes/categories");
const tagRoute = require("./routes/tags");
const postRoute = require("./routes/posts");

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use('/categories', categoryRoute);
app.use('/tags', tagRoute);
app.use('/posts', postRoute);

app.listen(process.env.PORT, () => {
    console.log("running on port "+process.env.PORT)
})