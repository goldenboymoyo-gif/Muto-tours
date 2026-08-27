export const metadata = {
  title: "Admin — Muto Tours",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-sand">{children}</div>;
}
