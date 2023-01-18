import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaPrint, FaDatabase, FaBars, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MY_GITHUB_LINK } from "@constants";

interface ISidebarProps {
  collapse: boolean,
  toggle: () => void
}

export function Sidebar(props: ISidebarProps) {
  return (
    <ProSidebar style={{ position: "fixed", height: "100vh" }} collapsed={props.collapse}>
      <SidebarHeader>
        <Menu iconShape='round'>
          <MenuItem icon={<FaBars />} style={{ fontSize: "18px", fontWeight: "bold" }} onClick={() => props.toggle()}>
            Chùa Hội Khánh
          </MenuItem>
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape='circle'>
          <MenuItem icon={<FaDatabase />}>
            <Link to={"/persons"}>Danh sách phật tử </Link>
          </MenuItem>
          <MenuItem icon={<FaPrint />}>
            <Link to={"/printer"}>In ấn</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape='circle'>
          <MenuItem icon={<FaGithub />} onClick={() => window.open(MY_GITHUB_LINK)}>
            Liên hệ
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
