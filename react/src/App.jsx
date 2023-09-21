import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-react';
import React from 'react';
import './App.css';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw 'Missing Publishable Key';
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <UserDetails />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

function UserDetails() {
  const Auth = useAuth();
  const User = useUser();

  if (!Auth.isLoaded || !Auth.userId || !User.isLoaded || !User.isSignedIn) {
    return null;
  }

  const { user } = User;

  return (
    <div>
      <p>Hello, {user.firstName}! Welcome to Clerk.</p>
      <p>User.user.id: {user.id}</p>
    </div>
  );
}

export default App;
