// Import the SignUp component from the Clerk library
import { SignUp } from "@clerk/nextjs";

// Define the Page component
// This component returns the SignUp component from Clerk
export default function Page() {
  return <SignUp />;
}
