import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";

// Reusable job card component with save/delete functionality
const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();
  const { toast } = useToast();

  // Job deletion functionality (for recruiters)
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  // Save/unsave job functionality (for candidates)
  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  // Handle saving/unsaving a job
  const handleSaveJob = async () => {
    try {
      // Store the current state before making the API call
      const wasAlreadySaved = saved;
      
      const result = await fnSavedJob({
        user_id: user.id,
        job_id: job.id,
      });
      
      