import Navbar from "./components/Navbar";
import { WordlyContextProvider } from "./context/WordlyContext";
import "./globals.css";

export const metadata = {
  title: "Wordly",
  description: "Wordle clone with no daily limit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 h-screen flex flex-col">
        <WordlyContextProvider>
          <div className="h-[10%]">
            <Navbar />
          </div>
          <div className="h-[90%]">{children}</div>
        </WordlyContextProvider>
      </body>
    </html>
  );
}
