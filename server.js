import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config({ debug: false, quiet: true });

const app = express();
const port = process.env.PORT || 3001;

