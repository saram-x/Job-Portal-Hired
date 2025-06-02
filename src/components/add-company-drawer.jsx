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
  
  