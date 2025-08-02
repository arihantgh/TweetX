import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
const app = express();

import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = process.env.PROJECT_URL;
const KEY = process.env.KEY;
const supabase = createClient(PROJECT_URL, KEY);

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.end("hello");
});

app.post("/api/tweets", async (req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const {error} = await supabase.from('tweets').insert({username:username,content:content})
  console.log(error)
});

app.get("/api/tweets", async (req, res) => {
  const { data, error } = await supabase.from('tweets').select()
  res.send(data)
});

app.listen(8000, () => {
  console.log("server running");
});
