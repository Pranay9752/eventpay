'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FormField } from "./components/FormField";
import { AuthProviders } from "./components/AuthProviders";
import Link from "next/link";
import { loginVendorAction } from "./actions/login";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginVendorAction, {
    success: null,
    message: null,
  });

  useEffect(() => {
    if (state.success) {
      router.push('/vendors/list');
    }
  }, [state.success, router]);

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
            {state.success === false && state.message && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-50 text-red-800 border-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <form action={loginVendorAction} className="space-y-4">
              <FormField
                label="Email"
                id="email"
                type="email"
                name="email"
                icon={<Mail size={18} />}
                placeholder="your.email@example.com"
                required
              />

              <FormField
                label="Password"
                id="password"
                type="password"
                name="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                required
              />

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" name="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <SubmitButton />
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-center text-sm text-gray-600">
              {`Don't have an account? `}
              <Link
                href={'/account/create-event'}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create one now
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          © 2025 Go Silly •{" "}
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