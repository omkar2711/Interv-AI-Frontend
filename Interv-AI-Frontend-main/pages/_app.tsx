import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserAuth from "@/context/UserAuth";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserAuth>
      <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        <Component {...pageProps} />
      </main>
    </UserAuth>
  );
}

export default MyApp;
