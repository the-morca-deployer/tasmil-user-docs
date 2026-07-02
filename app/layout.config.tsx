import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img
          src="/brand/logo.svg"
          alt="Tasmil"
          width={32}
          height={32}
        />
        <span
          className="bg-[length:200%_100%] bg-gradient-to-r from-[#67e8f9] via-white to-[#0ea5e9] bg-clip-text font-semibold text-transparent text-lg"
          style={{ animation: "shimmer-text 3s linear infinite" }}
        >
          Tasmil Finance
        </span>
      </>
    ),
  },
  themeSwitch: { enabled: false },
  links: [
    // {
    //   type: "custom",
    //   children: <ThemeSwitch />,
    // },
    {
      type: "custom",
      children: (
        <a
          href="https://tasmil.finance"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#67e8f9] to-[#0ea5e9] px-4 py-2 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:from-[#7DEDFA] hover:to-[#38BDF8]"
        >
          Launch App
        </a>
      ),
    },
  ],
};
