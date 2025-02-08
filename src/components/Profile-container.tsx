import React from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { Link, Loader } from "lucide-react";
const ProfileContainer: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center ml-auto mr-3">
        <Loader className="min-h-4 animate-spin  text-emerald-500" />
      </div>
    );
  }
  return (
    <div className="flex items-center ml-auto mr-4 text-white px-4 py-2 rounded">
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button
          onClick={() => (window.location.href = "/signin")}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md"
        >
          Sign in
        </button>
      )}
    </div>
  );
};
export default ProfileContainer;
