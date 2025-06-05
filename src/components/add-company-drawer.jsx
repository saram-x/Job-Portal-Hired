import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import useFetch from "@/hooks/use-fetch";
  import { addNewCompany } from "@/api/apiCompanies";
  import { BarLoader } from "react-spinners";
  import { useEffect } from "react";
  import { useToast } from "@/hooks/use-toast";
  
  // Validation schema for company registration form
  const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
      .any()
      .refine(
        (file) =>
          file[0] &&
          (file[0].type === "image/png" || file[0].type === "image/jpeg"),
        {
          message: "Only Images are allowed",
        }
      ),
  });
  
  // Modal drawer component for adding new companies to the platform
  const AddCompanyDrawer = ({ fetchCompanies }) => {
    const { toast } = useToast();
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
  
    const {
      loading: loadingAddCompany,
      error: errorAddCompany,
      data: dataAddCompany,
      fn: fnAddCompany,
    } = useFetch(addNewCompany);
  
    const onSubmit = async (data) => {
      fnAddCompany({
        ...data,
        logo: data.logo[0],
      });
    };
  
    useEffect(() => {
      if (dataAddCompany?.length > 0) {
        toast({
          title: "🏢 Company added successfully!",
          description: `${dataAddCompany[0].name} has been added to the platform.`,
          variant: "default",
        });
        fetchCompanies();
      }
    }, [dataAddCompany, fetchCompanies, toast]);

    // Show error toast if company creation fails
    useEffect(() => {
      if (errorAddCompany) {
        toast({
          title: "❌ Error adding company",
          description: errorAddCompany.message || "Failed to add the company. Please try again.",
          variant: "destructive",
        });
      }
    }, [errorAddCompany, toast]);
  
   