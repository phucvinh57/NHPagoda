import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { PersonInfoPage, PrinterPage } from "@pages";
import { Sidebar } from "@components";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  return (
    <div>
      <ToastContainer />
      <Sidebar toggle={() => setSidebarCollapse(!sidebarCollapse)} collapse={sidebarCollapse} />

      <div id='main' style={{ marginLeft: `${sidebarCollapse ? SidebarWidth.COLLAPSE : SidebarWidth.EXPAND}px` }}>
        <Routes>
          <Route path='/persons' element={<PersonInfoPage />} />
          <Route path='/' element={<PersonInfoPage />} />
          <Route path='/printer' element={<PrinterPage />} />
        </Routes>
      </div>
    </div>
  );
}
