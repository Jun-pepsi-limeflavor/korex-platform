"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  email: z.string().email("Invalid email").refine(
    (e) => !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(e.split("@")[1]),
    "Business email required"
  ),
  phone: z.string().optional(),
  country: z.string().optional(),
  process: z.string().min(1, "Please select a process"),
  volume: z.string().min(1, "Please select a volume"),
  description: z.string().max(500, "Max 500 characters").optional(),
  hearAboutUs: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    // In production: write to Firestore /leads collection
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-[#1A1A2E]">Message Sent.</h2>
        <p className="text-[#6B7280]">
          Your account manager will respond within 4 business hours.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#0A1628] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-bold">Get In Touch</h1>
          <p className="text-lg text-gray-300">Typical response time: within 4 business hours. All conversations covered by NDA upon request.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Left: contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-bold text-[#1A1A2E]">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#0066FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">Email</p>
                      <a href="mailto:hello@korex.io" className="text-sm text-[#6B7280] hover:text-[#0066FF]">hello@korex.io</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#0066FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">Phone</p>
                      <a href="tel:+18005550000" className="text-sm text-[#6B7280] hover:text-[#0066FF]">+1 (800) 555-0000</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#0066FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">Response Time</p>
                      <p className="text-sm text-[#6B7280]">Within 4 business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#F7F9FC] p-5">
                <h3 className="mb-3 font-semibold text-[#1A1A2E]">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex gap-2"><span className="font-bold text-[#0066FF]">1.</span> Our team reviews your inquiry within 4 hours</li>
                  <li className="flex gap-2"><span className="font-bold text-[#0066FF]">2.</span> A dedicated account manager is assigned to your project</li>
                  <li className="flex gap-2"><span className="font-bold text-[#0066FF]">3.</span> We schedule a 30-min scoping call to understand your requirements</li>
                  <li className="flex gap-2"><span className="font-bold text-[#0066FF]">4.</span> Quote delivered within 24 business hours of receiving files</li>
                </ol>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">First Name *</label>
                    <input {...register("firstName")} className={cn("w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.firstName ? "border-red-400" : "border-[#E5E7EB]")} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Last Name *</label>
                    <input {...register("lastName")} className={cn("w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.lastName ? "border-red-400" : "border-[#E5E7EB]")} />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Company *</label>
                  <input {...register("company")} className={cn("w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.company ? "border-red-400" : "border-[#E5E7EB]")} />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Company Email *</label>
                  <input {...register("email")} type="email" className={cn("w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.email ? "border-red-400" : "border-[#E5E7EB]")} />
                  {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Phone</label>
                    <input {...register("phone")} type="tel" className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Country / Region</label>
                    <input {...register("country")} className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Manufacturing Process of Interest *</label>
                  <select {...register("process")} className={cn("w-full rounded-md border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.process ? "border-red-400" : "border-[#E5E7EB]")}>
                    <option value="">Select process...</option>
                    <option>CNC Machining</option>
                    <option>Injection Molding</option>
                    <option>Sheet Metal Fabrication</option>
                    <option>Die Casting</option>
                    <option>Modular Construction Components</option>
                    <option>Electronics / PCB Assembly</option>
                    <option>Multiple / Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Estimated Annual Volume *</label>
                  <select {...register("volume")} className={cn("w-full rounded-md border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]", errors.volume ? "border-red-400" : "border-[#E5E7EB]")}>
                    <option value="">Select volume...</option>
                    <option>Prototype only</option>
                    <option>Under $50K</option>
                    <option>$50K – $250K</option>
                    <option>$250K – $1M</option>
                    <option>$1M+</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Project Description <span className="text-[#6B7280]">(optional, max 500 chars)</span></label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Brief description of your project, parts, or requirements..."
                    className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">How did you hear about us?</label>
                  <select {...register("hearAboutUs")} className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]">
                    <option value="">Select...</option>
                    <option>LinkedIn</option>
                    <option>Google Search</option>
                    <option>Referral</option>
                    <option>Trade Show</option>
                    <option>Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#0066FF] py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>

                <p className="text-center text-xs text-[#6B7280]">
                  All conversations are covered by NDA upon request.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
