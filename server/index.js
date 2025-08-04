import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PROJECT_URL = process.env.PROJECT_URL;
const KEY = process.env.KEY;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const supabase = createClient(PROJECT_URL, KEY);

app.get("/api", (req, res) => {
  res.end("hello");
});

app.post("/api/tweets", async (req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const { error } = await supabase
    .from("tweets")
    .insert({ username: username, content: content });
  console.log(error);
});

app.get("/api/tweets", async (req, res) => {
  const { data, error } = await supabase.from("tweets").select();
  res.send(data);
});

app.post("/api/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const { error } = await supabase
    .from("users")
    .insert({ email: email, password: password, username: username });
});

app.get("/api/signup", async (req, res) => {
  const { data, error } = await supabase.from("users").select("username,email");
  res.send(data);
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const {data,error} = await supabase.from('users').select().eq('email',email)
  if(data[0].password===password){
    res.send(data)
  }
  else{
    res.send(false)
  }
});

app.listen(PORT, () => {
  console.log("server running");
});
