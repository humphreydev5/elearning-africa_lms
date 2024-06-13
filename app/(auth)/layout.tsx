// Import the necessary type from React for type-checking the children prop
import React from 'react';

// Define the AuthLayout component
// This component takes a single prop 'children', which is of type React.ReactNode
const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  // Return a div that takes the full height of its container
  // Center the children both vertically and horizontally
  return ( 
    <div className="h-full flex items-center justify-center">
      {children}
    </div>
  );
}

// Export the AuthLayout component as the default export
export default AuthLayout;
