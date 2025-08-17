import supabaseClient from "@/utils/supabase";

// Fetch jobs with optional filters for listing page
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// Get user's saved jobs with company details
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// Get single job with company and applications data
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// Toggle save/unsave job for current user
export async function saveJob(token, _, saveData) {
  const supabase = await supabaseClient(token);

  // Check if job is already saved by this user
  const { data: existingSaves, error: checkError } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("user_id", saveData.user_id)
    .eq("job_id", saveData.job_id);

  if (checkError) {
    console.error("❌ Error checking existing saved job:", checkError);
    throw checkError;
  }

  if (existingSaves && existingSaves.length > 0) {
    