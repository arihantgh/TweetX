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

app.get("/api", (req,res)=>{
  res.redirect("https://www.google.com")
})

app.listen(PORT, () => {
  console.log("server running");
});
