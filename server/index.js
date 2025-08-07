import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PROJECT_URL = process.env.PROJECT_URL;
const KEY = process.env.KEY;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const supabase = createClient(PROJECT_URL, KEY);

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.send("no auth");

  jwt.verify(token, SECRET, (err, username) => {
    if (err) return res.send("no auth");
    req.username = username;
    next();
  });
};

app.post("/api/signup",async (req,res)=>{
  const {email,password,username} = req.body
  const {error} = await supabase.from("users").insert({email:email,password:password,username:username})
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);
  if (data.length > 0 && password === data[0].password) {
    const token = jwt.sign({ username: data[0].username }, SECRET);
    res.json({ token });
  } else {
    res.send("no auth");
  }
});

app.get("/api/home", auth, async (req, res) => {
  const { data, error } = await supabase.from("tweets").select();
  res.send([[{ username: req.username.username }], [...data]]);
});

app.post("/api/tweet", auth, async (req, res) => {
  const content = req.body.content;
  const { error } = await supabase
    .from("tweets")
    .insert({ username: req.username.username, content: content });
});

app.post("/api/delete",async (req, res) => {
  const tweetid = req.body.tweetid;
  const { error } = await supabase.from("tweets").delete().eq("id", tweetid);
});

app.post("/api/like",async (req,res)=>{
  const {tweetid,username} = req.body
  let {data,error} = await supabase.from("tweets").select("likes").eq("id",tweetid)
  const likesarr = data[0].likes
  await supabase.from("tweets").update({likes:[...likesarr,username]}).eq("id",tweetid) 
})

app.post("/api/comment",async (req,res)=>{
  const {tweetid,comment,username} = req.body
  let {data,error} = await supabase.from("tweets").select("comments").eq("id",tweetid)
  const commentarr = data[0].comments
  await supabase.from("tweets").update({comments:[...commentarr,{"username":username,"comment":comment}]}).eq("id",tweetid) 
})

app.listen(PORT, () => {
  console.log("server running");
});
