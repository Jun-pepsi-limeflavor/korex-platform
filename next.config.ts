import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin is auto-externalized by Next.js and native-required at
  // runtime, but its jwks-rsa -> jose (ESM-only) chain fails under require().
  // Forcing it through the bundler instead avoids ERR_REQUIRE_ESM.
  transpilePackages: ["firebase-admin"],
};

export default nextConfig;
