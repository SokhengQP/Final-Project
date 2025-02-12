import { Outlet } from "react-router";
import Header from './components/header/Header'

export default function MasterLayout() {

     return (
          <>
               
               <Header />
               <Outlet />
               
          </>
     );
}