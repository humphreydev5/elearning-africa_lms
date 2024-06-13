// Import the SignIn component from the Clerk library
import { SignIn } from "@clerk/nextjs";

// Define the Page component
// This component returns the SignIn component from Clerk
export default function Page() {
  return <SignIn />;
}
