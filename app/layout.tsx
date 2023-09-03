import "./globals.css";
import "@fontsource/bungee-shade";
import "@fontsource/poppins";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Steptember",
  description: "Shorthand's Steptember challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0 font-body">
        <main
          className="bg-indigo-950 h-screen overflow-y-auto
           from-indigo-950 to-indigo-900 
          bg-gradient-to-t
           h-screen
        "
        >
          <div className="container mx-auto h-screen">{children}</div>
        </main>
      </body>
    </html>
  );
}
