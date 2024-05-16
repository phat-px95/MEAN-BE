/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import * as path from "path";
import Post from "../src/model/post.model.js";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";

const app = express();
mongoose.connect("mongodb+srv://phatpx32:tKmk7CgvfuLaEJ0Q@cluster0.ix4rqwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(res => {
    if(res) {
      console.log("Database is connected");
    }
  })
  .catch(error => {
    console.log("Error: ", error);
  })
;

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requestd-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body?.title,
    content: req.body?.content
  });
  post.save().then(dbResponse => {
    if (dbResponse) {
      res.status(201).json({
        message: "Post added successfully"
      });
    }
  });

});

app.get("/api/posts", (req, res, next) => {
  console.log(Post.find().then(posts => {
    console.log(posts);
    res.send(posts.map(post => new Post({
      title: post.title,
      content: post.content
    })));
  }));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// server.listen(process.env.PORT || 3000);
server.on("error", console.error);
