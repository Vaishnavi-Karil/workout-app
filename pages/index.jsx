import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/google");
      const data = await response.json();
      router.push(data.authUrl);
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
