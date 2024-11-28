"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const page = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignIn = (e: any) => {
    const { name, value } = e.target;
    setIsSubmitted(false);
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate inputs
    if (name === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors((prev) => ({
        ...prev,
        email: emailValid || value === "" ? "" : "Invalid email address",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length >= 8 || value.length === 0
            ? ""
            : "Password must be at least 8 characters",
      }));
    }
  };

  const handleSignUpSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Submit logic here
    console.log("Form submitted:", formData);
  };

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    errors.email !== "" ||
    errors.password !== "";

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signIn"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          {" "}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign in</TabsTrigger>
            <TabsTrigger value="signUp">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <Card className="px-5">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUpSubmit}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">User Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleSignIn}
                      placeholder="johndoe@gmail.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="current">Password</Label>
                    <Input
                      id="current"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleSignIn}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isButtonDisabled}>
                    Sign in
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signUp">
            <Card className="px-5">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">User Name</Label>
                  <Input id="name" type="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">User Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="current">Password</Label>
                  <Input id="current" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sign up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
