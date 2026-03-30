"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosInstance";
import { useStoreContext } from "@/context/authContext";
import axios from "axios";
import { toast } from "sonner";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles, ShieldCheck, Zap } from "lucide-react";

/**
 * Modern, High-Fidelity Authentication Page for TechTrail
 */
const Page = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const { setToken, setAuth } = useStoreContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [formData2, setFormData2] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors2, setErrors2] = useState({ name: "", email: "", password: "" });

  const handleSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/login", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        setAuth({ authenticate: true, user: res.data.validUser });
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
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

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignUpLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/register", {
        ...formData2,
        role: "student",
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData2({ userName: "", email: "", password: "" });
        setActiveTab("signIn");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSignUpLoading(false);
    }
  };

  const isSignInDisabled = !formData.email || !formData.password || errors.email !== "" || errors.password !== "" || loading;
  const isSignUpDisabled = !formData2.userName || !formData2.email || !formData2.password || errors2.name !== "" || errors2.email !== "" || errors2.password !== "" || signUpLoading;

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden">
      
      {/* Left Side: Branding & Visuals Section */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center px-16 bg-gradient-to-br from-blue-900/20 via-black to-black border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[150px] animate-pulse delay-700"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <GraduationCap className="size-8 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase">TechTrail</span>
          </div>
          
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Modern Stack</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mb-12">
            Join thousands of students learning professional development skills from industry experts via high-fidelity, interactive trails.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
               <Zap className="size-6 text-blue-400 mt-1" />
               <div>
                  <h4 className="font-bold">Instant Access</h4>
                  <p className="text-sm text-gray-500">Start learning immediately after enrollment.</p>
               </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
               <ShieldCheck className="size-6 text-purple-400 mt-1" />
               <div>
                  <h4 className="font-bold">Expert Content</h4>
                  <p className="text-sm text-gray-500">Curated materials by domain professionals.</p>
               </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-16 flex items-center gap-2 text-sm text-gray-500">
           <Sparkles className="size-4 text-blue-500" />
           <span>Trusted by 10k+ learners globally</span>
        </div>
      </div>

      {/* Right Side: Auth Forms Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none lg:hidden"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Identity */}
          <div className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <GraduationCap className="size-8 text-blue-500" />
            <span className="text-2xl font-black tracking-tighter uppercase">TechTrail</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-base">Sign in or create an account to start your learning trail.</p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 border border-white/10 rounded-xl mb-8">
              <TabsTrigger 
                value="signIn"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signUp"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "signIn" ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "signIn" ? 10 : -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="signIn" className="mt-0 outline-none">
                  <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                    <form onSubmit={handleSignInSubmit}>
                      <CardContent className="pt-8 space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleSignIn}
                            placeholder="name@example.com"
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600"
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="current" className="text-gray-400">Password</Label>
                            <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</button>
                          </div>
                          <Input
                            id="current"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleSignIn}
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <Button
                          type="submit"
                          disabled={isSignInDisabled}
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" />
                              <span>Brewing your dashboard...</span>
                            </div>
                          ) : "Sign In to TechTrail"}
                        </Button>
                      </CardContent>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="signUp" className="mt-0 outline-none">
                  <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                    <form onSubmit={handleSignUpSubmit}>
                      <CardContent className="pt-8 space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                          <Input
                            id="name"
                            name="userName"
                            placeholder="John Doe"
                            value={formData2.userName}
                            onChange={handleSignUp}
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600"
                          />
                          {errors2.name && <p className="text-red-400 text-xs mt-1">{errors2.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email_up" className="text-gray-400">Email Address</Label>
                          <Input
                            id="email_up"
                            type="email"
                            name="email"
                            value={formData2.email}
                            onChange={handleSignUp}
                            placeholder="name@example.com"
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600"
                          />
                          {errors2.email && <p className="text-red-400 text-xs mt-1">{errors2.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pass_up" className="text-gray-400">Password</Label>
                          <Input
                            id="pass_up"
                            type="password"
                            name="password"
                            value={formData2.password}
                            onChange={handleSignUp}
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                          {errors2.password && <p className="text-red-400 text-xs mt-1">{errors2.password}</p>}
                        </div>
                        <Button
                          type="submit"
                          disabled={isSignUpDisabled}
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                          {signUpLoading ? (
                            <div className="flex items-center gap-2">
                              <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" />
                              <span>Creating your trail...</span>
                            </div>
                          ) : "Create Account"}
                        </Button>
                      </CardContent>
                    </form>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <p className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to TechTrail's <button className="text-gray-400 hover:underline">Terms of Service</button> and <button className="text-gray-400 hover:underline">Privacy Policy</button>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
