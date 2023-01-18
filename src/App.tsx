import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { FaPrint, FaDatabase, FaBars, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { SidebarWidth } from "./constants";

export default function App() {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  return (
    <div>
      <ProSidebar style={{ position: "fixed", height: "100vh" }} collapsed={sidebarCollapse}>
        <SidebarHeader>
          <Menu iconShape='round'>
            <MenuItem
              icon={<FaBars onClick={() => setSidebarCollapse(!sidebarCollapse)} />}
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Chùa Hội Khánh
            </MenuItem>
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem icon={<FaDatabase />}>Danh sách phật tử</MenuItem>
            <MenuItem icon={<FaPrint />}>In ấn</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape='circle'>
            <MenuItem icon={<FaGithub />}>Liên hệ</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
      <div id='main' style={{ marginLeft: `${sidebarCollapse ? SidebarWidth.COLLAPSE : SidebarWidth.EXPAND}px` }}>
        <Button>Toggle</Button>
      </div>
    </div>
  );
}
