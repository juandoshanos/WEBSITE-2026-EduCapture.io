import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Phone, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateStudentDialogProps {
  onStudentCreated?: (student: FormValues) => void;
  language: Language;
}

export const CreateStudentDialog = ({ onStudentCreated, language }: CreateStudentDialogProps) => {
  const { t } = useTranslation(language);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // Here you would typically send the data to your backend
    console.log("New student data:", values);
    
    // Show success toast
    toast({
      title: "Student Created Successfully!",
      description: `${values.name} has been added to your student list.`,
    });

    // Call the callback if provided
    onStudentCreated?.(values);

    // Reset form and close dialog
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-16 bg-gradient-primary hover:shadow-lg transition-all duration-300">
          <Plus className="mr-2 h-5 w-5" />
          {t('addNewStudent')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <User className="h-5 w-5" />
            {t('createStudent')}
          </DialogTitle>
          <DialogDescription>
            {t('addNewStudentDesc')}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t('fullName')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('enterFullName')} 
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t('phoneNumber')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('enterPhoneNumber')} 
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('emailAddress')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder={t('enterEmailAddress')} 
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-primary hover:shadow-lg transition-all duration-300"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? `${t('create')}...` : t('create')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};