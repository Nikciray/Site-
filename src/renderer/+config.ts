import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

export default {
  extends: [vikeReact],
  ssr: false,
  reactStrictMode: false
} satisfies Config;