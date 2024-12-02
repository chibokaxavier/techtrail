"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useRef, useState } from "react";
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
import axiosInstance from "@/api/axiosInstance";
import { useStoreContext } from "@/context/authContext";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const page = () => {
  const toast = useRef<Toast>(null);
  const [activeTab, setActiveTab] = useState("signIn");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const { setToken, token, setAuth, auth } = useStoreContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formData2, setFormData2] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors2, setErrors2] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
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
  const showSuccess = (message: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const handleSignInSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/login", formData);
      if (res.data.success) {
        showSuccess(res.data.message);
        localStorage.setItem("token", res.data.token);
        setAuth({ authenticate: true, user: res.data.validUser });
        setToken(res.data.token);
        setLoading(false);
        setFormData({
          email: "",
          password: "",
        });
        // router.push(`/${res.data.validUser.role}`);
      } else {
        showError(res.data.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          showError(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        showError("An unexpected error occurred.");
      }
    }
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

    if (name === "userName") {
      setErrors2((prev) => ({
        ...prev,
        name:
          value.length >= 4 || value.length === 0
            ? ""
            : "Name must be at least 4 characters",
      }));
    }
  };

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/register", {
        ...formData2,
        role: "student",
      });
      console.log("Response data:", res.data);

      if (res.data.success) {
        console.log("Success block executed");
        showSuccess(res.data.message);
        setLoading(false);
        setFormData2({
          userName: "",
          email: "",
          password: "",
        });
        setActiveTab("signIn");
      } else {
        showError(res.data.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          showError(error.response.data.message);
        }
      } else {
        showError("An unexpected error occurred here.");
      }
    }
  };

  const isButton2Disabled =
    !formData2.userName ||
    !formData2.email ||
    !formData2.password ||
    errors2.name !== "" ||
    errors2.email !== "" ||
    errors2.password !== "";

  return (
    // <ProtectedRoute authenticate={auth?.authenticate} user={auth?.user}>
    <div className="flex flex-col min-h-screen ">
      <Toast ref={toast} position="bottom-right" />
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
                  <Button
                    className={`${
                      isButtonDisabled ? "cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    {loading ? "Signing you in !" : "Sign in"}
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
                      name="userName"
                      placeholder="John Doe"
                      value={formData2.userName}
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
                    {loading ? "Signing you up !" : "Sign up"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    // </ProtectedRoute>
  );
};

export default page;
