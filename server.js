import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config({ debug: false, quiet: true });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Suspicious patterns for job detection (refined to avoid false positives)
const SUSPICIOUS_PATTERNS = {
  highSalary: /(\$|USD|dollars?)\s*([1-9]\d{6,}|\d{1,2},\d{3},\d{3})/i, // Increased threshold to $1M+
  tooGoodToBeTrue: /(million|millionaire|get rich quick|easy money|no experience required.*high salary|make.*\$.*fast|instant wealth|quick cash)/i,
  promotionalContent: /(buy now|click here|visit our website.*urgent|act fast|limited time offer|special promotion|discount code|sale ending soon)/i,
  vagueTitles: /^(make money|earn money|work from home|amazing opportunity|easy job|get paid to|mystery shopper)$/i,
  suspiciousCompanies: /(unknown company|company name: n\/a|not specified|test\.com|fake-company|scam corp)/i,
  multiLevelMarketing: /(mlm scheme|pyramid scheme|network marketing.*recruitment|recruit others|downline commissions|upline bonuses|multi level marketing|referral program.*unlimited)/i,
  crypto: /(bitcoin mining|crypto trading|forex trading.*guaranteed|investment scheme|trading bot|cryptocurrency.*guaranteed returns)/i,
  scamKeywords: /(guaranteed income|no skills needed.*high pay|work 1 hour.*\$|instant money|cash fast.*today|get paid daily|no interview required.*high salary)/i
};

// Analyze a single job for suspicious patterns
const analyzeJobForSuspiciousPatterns = (job) => {
  const title = (job.title || "").toLowerCase();
  const description = (job.description || "").toLowerCase();
  const location = (job.location || "").toLowerCase();
  const jobText = `${title} ${description} ${location}`;
  
  let suspiciousReasons = [];

  // Check for suspicious patterns
  if (SUSPICIOUS_PATTERNS.highSalary.test(jobText)) {
    suspiciousReasons.push("Unusually high salary mentioned");
  }
  if (SUSPICIOUS_PATTERNS.tooGoodToBeTrue.test(jobText)) {
    suspiciousReasons.push("Too good to be true claims");
  }
  if (SUSPICIOUS_PATTERNS.promotionalContent.test(jobText)) {
    suspiciousReasons.push("Contains promotional/marketing content");
  }
  if (SUSPICIOUS_PATTERNS.vagueTitles.test(title)) {
    suspiciousReasons.push("Vague or generic job title");
  }
  if (SUSPICIOUS_PATTERNS.suspiciousCompanies.test(jobText)) {
    suspiciousReasons.push("Suspicious company name");
  }
  if (SUSPICIOUS_PATTERNS.multiLevelMarketing.test(jobText)) {
    suspiciousReasons.push("Possible MLM/pyramid scheme");
  }
  if (SUSPICIOUS_PATTERNS.crypto.test(jobText)) {
    suspiciousReasons.push("Cryptocurrency/trading/investment related");
  }
  if (SUSPICIOUS_PATTERNS.scamKeywords.test(jobText)) {
    suspiciousReasons.push("Contains common scam keywords");
  }

  