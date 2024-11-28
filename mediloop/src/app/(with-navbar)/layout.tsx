import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="sticky top-0 z-50 bg-white border border-b-slate-900">
        <Navbar />
    </div>
    {children}
    </>
  )
}
