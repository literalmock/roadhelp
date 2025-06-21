import { Outlet } from "react-router-dom";
import Header from "../components/header";
import "../App.css";


const AppLayout = () => {
  return (
    <div>
      <div className=""></div>
      <main className="min-h-screen ">
       <Header/> 
       <Outlet />
      </main>
    </div>
  );
};
export default AppLayout;