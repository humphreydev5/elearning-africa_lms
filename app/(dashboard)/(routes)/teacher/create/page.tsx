// Import necessary libraries and components
import * as z from "zod"; // Library for schema validation
import axios from "axios"; // Library for making HTTP requests
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for React Hook Form using Zod schemas
import { useForm } from "react-hook-form"; // Library for managing form state and validation
import { useRouter } from "next/navigation"; // Hook for navigation in Next.js
import Link from "next/link"; // Component for client-side navigation in Next.js
import toast from "react-hot-toast"; // Library for toast notifications

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form"; // Custom UI components for forms
import { Button } from "@/components/ui/button"; // Custom UI component for buttons
import { Input } from "@/components/ui/input"; // Custom UI component for input fields

// Define the schema for the form using Zod
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required", // Error message if title is not provided
  }),
});

// Define the CreatePage component
const CreatePage = () => {
  const router = useRouter(); // Initialize the router hook
  const form = useForm<z.infer<typeof formSchema>>({ // Initialize the form hook with the defined schema
    resolver: zodResolver(formSchema), // Use Zod resolver for form validation
    defaultValues: {
      title: "" // Default value for the title field
    },
  });

  const { isSubmitting, isValid } = form.formState; // Destructure form state properties

  // Define the submit handler function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send a POST request to create a new course with the provided values
      const response = await axios.post("/api/courses", values);
      // Redirect to the newly created course page
      router.push(`/teacher/courses/${response.data.id}`);
      // Display a success toast notification
      toast.success("Course created");
    } catch {
      // Display an error toast notification if something goes wrong
      toast.error("Something went wrong");
    }
  }

  // Render the UI elements
  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your course
        </h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can change this later.
        </p>
        {/* Render the form with React Hook Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} // Call the submit handler onSubmit form submission
            className="space-y-8 mt-8"
          >
            {/* Render the form field for the course title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Render buttons for cancel and continue */}
            <div className="flex items-center gap-x-2">
              {/* Render a button to cancel and return to the homepage */}
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              {/* Render a button to submit the form */}
              <Button
                type="submit"
                disabled={!isValid || isSubmitting} // Disable the button if the form is invalid or submitting
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
// Export the CreatePage component as the default export of the module
export default CreatePage;
