import Header from "@/components/Header";
import "@/styles/globals.css";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <main className={`mx-auto max-w-screen-2xl ${inter.className}`}>
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
