import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <div className="flex h-16 items-center border-b border-[#E5E7EB] bg-white px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#0A1628]">
            <span className="text-xs font-bold text-white">KX</span>
          </div>
          <span className="text-base font-bold text-[#0A1628] tracking-tight">KOREX</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        {children}
      </div>
    </div>
  );
}
