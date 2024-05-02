/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import Post from '../src/model/post.model.js';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
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
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// server.listen(process.env.PORT || 3000);
server.on('error', console.error);
