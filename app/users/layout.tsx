import Sidebar from "../components/sidebar/Sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <main className="lg:pl-20 h-full">{children}</main>
      </div>
      ;
    </Sidebar>
  );
}
