import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  return <AdminClient blobConfigured={blobConfigured} />;
}
