"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

const PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY ?? "";

export function ChannelTalk() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PLUGIN_KEY) return;

    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: PLUGIN_KEY,
    });

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  // SPA page tracking for Channel Talk workflows / marketing
  useEffect(() => {
    if (!PLUGIN_KEY || !pathname) return;
    ChannelService.setPage(pathname);
  }, [pathname]);

  return null;
}
