import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaAccessibleIcon, FaDatabase } from "react-icons/fa";
export default function App() {
  return (
    <ProSidebar>
      <Menu iconShape='square'>
        <MenuItem icon={<FaDatabase />}>Dashboard</MenuItem>
        <SubMenu title='Components' icon={<FaAccessibleIcon />}>
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
}
