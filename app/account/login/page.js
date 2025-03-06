"use client"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField } from "./components/FormField";
import { AuthProviders } from "./components/AuthProviders";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setLoginError("");
  
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      const remember = formData.get("remember") === "on";
  
      // Create a loginData object that can be used for server actions or API calls
      const loginData = {
        email,
        password,
        remember,
      };
  
      try {
        // This would be your actual server-side authentication
        // For example using Next.js Server Actions:
        // await loginAction(loginData);
  
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        // Uncomment to simulate error
        // throw new Error("Invalid email or password. Please try again.");
  
        // On success, redirect to dashboard
        console.log("Login successful with data:", loginData);
        router.push("/");
      } catch (error) {
        setLoginError(
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}
        />
  
        <div className="w-full max-w-md z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
  
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
  
            <CardContent>
              {loginError && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-50 text-red-800 border-red-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
  
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  icon={<Mail size={18} />}
                  placeholder="your.email@example.com"
                  required
                />
  
                <FormField
                  label="Password"
                  id="password"
                  type="password"
                  icon={<Lock size={18} />}
                  placeholder="••••••••"
                  required
                />
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" name="remember" />
                    <Label htmlFor="remember" className="text-sm font-medium">
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
  
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
  
              <div className="mt-6">
                <AuthProviders />
              </div>
            </CardContent>
  
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-center text-sm text-gray-600">
                {`Don't have an account? `}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Create one now
                </a>
              </p>
            </CardFooter>
          </Card>
  
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 EventFlow •{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    );
  }
  


  
  // Example server action (would go in a separate file)
  // app/actions/auth.ts
  // 'use server';
  /*
  import { cookies } from 'next/headers';
  import { redirect } from 'next/navigation';
  import { LoginCredentials, AuthResult } from '@/types/auth';
  
  export async function loginAction(credentials: LoginCredentials): Promise<AuthResult> {
    // This would be your actual authentication logic
    // e.g., calling your authentication API
    
    try {
      const response = await fetch('https://api.yourservice.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      // Set authentication cookies
      if (credentials.remember) {
        cookies().set('auth-token', data.token, { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });
      } else {
        cookies().set('auth-token', data.token, { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production',
          path: '/'
        });
      }
      
      return {
        success: true,
        token: data.token,
        user: data.user
      };
      
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }
  */
  