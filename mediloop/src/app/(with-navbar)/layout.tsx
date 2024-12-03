import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-0 w-full bg-white border border-b-slate-900 z-50">
        <Navbar />
      </div>
      <div className="mt-[64px]">
        {children}
      </div>
    </>
  );
}
