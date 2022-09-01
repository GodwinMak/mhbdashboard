import React, {useState} from 'react'
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import {HiDocumentReport} from "react-icons/hi"
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";



const Sidebar = ({setShow, show}) => {

    const [isLoggedin, setIsLoggedin] = useState(true);
    console.log(isLoggedin)

    const navigate = useNavigate();

    

    const [collapsed, setCollapsed] = useState(false);
    // added styles 
    const styles = {
        sideBarHeight: {
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            overflowX: "hidden"
        },
        menuIcon: {
            float: "right",
            margin: "10px",
        },
    };
    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
        // event.currentTarget.classList.add('active');
        if (collapsed === true) {
            setShow(false);
        }
        else {
            setShow(true)
        }
    };

    const handleLogOut = async () => {
        localStorage.removeItem('MHB-WEB-DASH');
        setIsLoggedin(false)
        navigate('/login')
    }
  return (
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
          <SidebarHeader>
              <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                  <AiOutlineMenu />
              </div>
          </SidebarHeader>
          <Menu iconShape="square">
              <MenuItem icon={< HiDocumentReport />}>
                  Add Image
                  <Link to='/dashboard' />
              </MenuItem>
              <MenuItem icon={<AiOutlineLogout />} onClickCapture={handleLogOut}>
                  Logout
              </MenuItem>
          </Menu>
      </ProSidebar>
  )
}

export default Sidebar