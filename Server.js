import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('/public'));
app.use(express.static(__dirname + "/public"));

const posts = [{ content: "a" }];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.post("/posts", (req, res) => {
  posts.unshift(req.body);
  res.render("index", { posts });
});

app.put("/posts/:index", (req, res) => {
  const index = parseInt(req.params.index);
  posts[index] = req.body; // Update the task
  //   res.render("index", { posts });
  res.send();
});

app.post("/update-post/:id", (req, res) => {
  posts[req.params.id] = req.body;
  res.redirect("/");
});

app.get("/delete-post/:id", (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
