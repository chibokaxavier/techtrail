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
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors2, setErrors2] = useState({ name: "", email: "", password: "" });

  const handleSignIn = (e: any) => {
    const { name, value } = e.target;
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

  const handleSignInSubmit = (e: any) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted:", formData);
  };

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    errors.email !== "" ||
    errors.password !== "";

  const handleSignUp = (e: any) => {
    const { name, value } = e.target;
    // Update form data
    setFormData2((prev) => ({ ...prev, [name]: value }));
    // Validate inputs

    if (name === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors2((prev) => ({
        ...prev,
        email: emailValid || value === "" ? "" : "Invalid email address",
      }));
    }

    if (name === "password") {
      setErrors2((prev) => ({
        ...prev,
        password:
          value.length >= 8 || value.length === 0
            ? ""
            : "Password must be at least 8 characters",
      }));
    }

    if (name === "name") {
      setErrors2((prev) => ({
        ...prev,
        name:
          value.length >= 4 || value.length === 0
            ? ""
            : "Name must be at least 4 characters",
      }));
    }
  };

  const handleSignUpSubmit = (e: any) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted:", formData);
  };

  const isButton2Disabled =
    !formData2.name ||
    !formData2.email ||
    !formData2.password ||
    errors2.email !== "" ||
    errors2.password !== "";

  console.log(formData2);
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
              <form onSubmit={handleSignInSubmit}>
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
              <form onSubmit={handleSignUpSubmit}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">User Name</Label>
                    <Input
                      id="name"
                      type="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData2.name}
                      onChange={handleSignUp}
                    />
                    {errors2.name && (
                      <p className="text-red-500 text-sm">{errors2.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">User Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData2.email}
                      onChange={handleSignUp}
                      placeholder="johndoe@gmail.com"
                    />
                    {errors2.email && (
                      <p className="text-red-500 text-sm">{errors2.email}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="current">Password</Label>
                    <Input
                      id="current"
                      type="password"
                      name="password"
                      onChange={handleSignUp}
                      value={formData2.password}
                    />
                    {errors2.password && (
                      <p className="text-red-500 text-sm">{errors2.password}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isButton2Disabled}>
                    Sign up
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
