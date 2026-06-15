import { BrandLogo } from "@/components/layout/BrandLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <div className="flex h-16 items-center border-b border-[#E5E7EB] bg-white px-6">
        <BrandLogo href="/" size="sm" />
      </div>
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        {children}
      </div>
    </div>
  );
}
