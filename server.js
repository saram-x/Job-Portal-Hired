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

  // Additional structural checks (refined)
  if (description.length < 30) {
    suspiciousReasons.push("Job description too short/vague");
  }
  if (title.length > 150) {
    suspiciousReasons.push("Unusually long job title");
  }
  if ((description.includes("http") || description.includes("www.")) && 
      (description.includes("apply here") || description.includes("click to apply") || description.includes("external site"))) {
    suspiciousReasons.push("Contains suspicious external links");
  }

  return suspiciousReasons;
};

// Add recruiter details to a job
const addRecruiterDetailsToJob = async (job) => {
  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${job.recruiter_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const recruiter = await response.json();
      return {
        ...job,
        recruiter_email: recruiter.email_addresses?.[0]?.email_address || "N/A",
        recruiter_name: recruiter.first_name || "N/A",
        companies: { name: "N/A" }
      };
    } else {
      return {
        ...job,
        recruiter_email: "N/A",
        recruiter_name: "N/A",
        companies: { name: "N/A" }
      };
    }
  } catch (err) {
    return {
      ...job,
      recruiter_email: "N/A",
      recruiter_name: "N/A",
      companies: { name: "N/A" }
    };
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Get all users for admin
app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("❌ Clerk API error:", response.status);
      return res.status(response.status).json({ error: "Failed to fetch users from Clerk" });
    }

    const users = await response.json();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ error: "Server error fetching users" });
  }
});

// Delete user
app.delete("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("❌ Failed to delete user:", response.status);
      return res.status(response.status).json({ error: "Failed to delete user" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ error: "Server error deleting user" });
  }
});

// Ban user
app.post("/api/ban-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${userId}/ban`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to ban user" });
    }

    res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error banning user" });
  }
});

