"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/lib/api/client";
import { CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { userProfile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: userProfile?.firstName ?? "",
    lastName: userProfile?.lastName ?? "",
    company: userProfile?.company ?? "",
    phone: userProfile?.phone ?? "",
    country: userProfile?.country ?? "",
    jobTitle: userProfile?.jobTitle ?? "",
  });

  const handleSave = async () => {
    if (!userProfile?.id) return;
    setSaving(true);
    await updateUser(form);
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#1A1A2E]">Profile & Settings</h1>

      <div className="max-w-xl space-y-6">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="mb-4 font-semibold text-[#1A1A2E]">Account Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">First Name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Last Name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Email</label>
              <input
                value={userProfile?.email ?? ""}
                disabled
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm bg-[#F7F9FC] text-[#6B7280]"
              />
              <p className="mt-0.5 text-xs text-[#6B7280]">Email cannot be changed</p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Company</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Country</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#1A1A2E]">Job Title</label>
              <input
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-5 flex items-center gap-2 rounded-md bg-[#0066FF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saved ? <><CheckCircle className="h-4 w-4" /> Saved</> : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[#1A1A2E]">Account Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#6B7280]">Account Status</dt>
              <dd className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-medium text-green-700 capitalize">{userProfile?.accountStatus}</span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6B7280]">Member Since</dt>
              <dd className="font-medium">
                {userProfile?.createdAt
                  ? new Date(userProfile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
