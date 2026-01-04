import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-screen gap-12 pt-24">
      <div className="hidden md:block">
        <div className="sticky top-28 h-[calc(100vh-9rem)]">
          <SideNavigation />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}