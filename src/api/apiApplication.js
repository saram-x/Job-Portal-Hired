import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Submit job application with resume upload
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  // Generate unique filename for resume
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  // Upload resume to storage
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  // Get public URL for uploaded resume
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Insert application record with resume URL
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

