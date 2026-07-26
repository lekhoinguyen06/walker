import { Outlet } from "react-router";
import Header from "./components/Header";

function AppLayout() {
  return (
    <div className="w-full min-h-screen justify-center flex flex-col gap-24 p-24 items-center overflow-y-scroll">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
