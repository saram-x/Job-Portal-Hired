import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Get all companies for dropdown lists and filters
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data;
}

// Create new company with logo upload
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  // Generate unique filename for logo
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  