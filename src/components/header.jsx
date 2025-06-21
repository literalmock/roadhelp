import { Link, redirect, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignIn,
} from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get('sign-in')) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <div>
      <nav className="py-4 flex justify-between items-center px-4 mx-auto">
        <Link to="/">
          <img src="/logo.png" className="h-14" alt="Logo" />
        </Link>

       <SignedOut>
  <div className="flex items-center gap-2">
    <SignInButton mode="modal">
      <Button variant="ghost">Log in</Button>
    </SignInButton>
    <SignUpButton mode="modal">
      <Button variant="ghost">Sign up</Button>
    </SignUpButton>
  </div>
</SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'h-10 w-10',
              },
            }}
          />
        </SignedIn>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <SignIn signUpForceRedirectUrl="/onboarding" fallbackUrl="/onboarding" />
        </div>
      )}
    </div>
  );
};

export default Header;

