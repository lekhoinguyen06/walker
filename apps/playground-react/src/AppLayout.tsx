import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toast";

function AppLayout() {
  return (
    <div className="w-full min-h-screen justify-center flex flex-col gap-24 p-24 items-center overflow-y-scroll">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default AppLayout;
