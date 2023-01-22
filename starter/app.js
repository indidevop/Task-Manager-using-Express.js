const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const internalServerError = require("./middleware/error-handler");

// Middleware
app.use(express.static("./public"));
app.use(express.json()); // to get data in req.body

// routes
app.use("/api/v1/tasks", tasks);

// Middleware

app.use(notFound); //This will be executed if route does not exist, else control will not reach here 
app.use(internalServerError); // Other middlewares will redirect to this is error occurs


const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
