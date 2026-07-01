"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/firebase/auth";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError(null);
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
    } catch {
      setServerError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-sm border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Welcome Back</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Log in to your formadikor account</p>
        </div>

        {serverError && (
          <div className="mb-4 flex items-start gap-2 rounded-sm bg-red-50 border border-red-200 p-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Email</label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              className={cn(
                "w-full rounded-sm border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]",
                errors.email ? "border-red-400" : "border-[#E5E7EB]"
              )}
            />
            {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                className={cn(
                  "w-full rounded-sm border px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]",
                  errors.password ? "border-red-400" : "border-[#E5E7EB]"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-2.5 text-[#6B7280]"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-0.5 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-[#0066FF] py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-[#0066FF] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
