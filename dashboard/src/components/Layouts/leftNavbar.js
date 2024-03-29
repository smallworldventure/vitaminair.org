import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import { BsGrid, BsGift } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/vitaminair.png';
import {
  TeamOutlined,
  FolderViewOutlined,
  ApartmentOutlined,
  FileSearchOutlined,
  FolderOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;
const LeftNavbar = () => {
  const pathname = window.location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <React.Fragment>
      <Sider
        collapsed={collapsed}
        onCollapse={onCollapse}
        // className="site-layout-background"
        width={290}
      >
        <div className="logo">
          <Link to="/">
            <center>
              <img
                style={{ maxWidth: '60%', padding: '8px' }}
                src={logo}
                alt="img"
              />
            </center>
          </Link>
        </div>
        <Menu
          theme="dark"
          // style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          mode="inline"
        >
          <Menu.Item key="/" icon={<BsGrid />}>
            <Link to="/" />
            Dashboard
          </Menu.Item>
          <Menu.Item key="/admin/contributors" icon={<BsGift />}>
            <Link to="/admin/contributors" />
            Contributors
          </Menu.Item>
          <SubMenu
            key={
              pathname === '/admin/initations'
                ? '/admin/initations'
                : '/admin/addinitation'
                ? '/admin/addinitation'
                : ''
            }
            icon={<ApartmentOutlined />}
            title="Initiations"
          >
            <Menu.Item key="/admin/initations">
              <Link to="/admin/initations" />
              Initiations
            </Menu.Item>
            <Menu.Item key="/admin/addinitation">
              <Link to="/admin/addinitation" />
              Add Initiations
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === '/admin/members'
                ? '/admin/members'
                : '/admin/addmember'
                ? '/admin/addmember'
                : ''
            }
            icon={<TeamOutlined />}
            title="Team"
          >
            <Menu.Item key="/admin/members">
              <Link to="/admin/members" />
              Members
            </Menu.Item>
            <Menu.Item key="/admin/addmember">
              <Link to="/admin/addmember" />
              Add Member
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === '/admin/abouts'
                ? '/admin/abouts'
                : '/admin/addabout'
                ? '/admin/addabout'
                : ''
            }
            icon={<FileSearchOutlined />}
            title="About"
          >
            <Menu.Item key="/admin/abouts">
              <Link to="/admin/abouts" />
              Abouts
            </Menu.Item>
            <Menu.Item key="/admin/addabout">
              <Link to="/admin/addabout" />
              Add About
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === '/admin/projects'
                ? '/admin/projects'
                : '/admin/addproject'
                ? '/admin/addproject'
                : ''
            }
            icon={<FolderViewOutlined />}
            title="Project"
          >
            <Menu.Item key="/admin/projects">
              <Link to="/admin/projects" />
              Projects
            </Menu.Item>
            <Menu.Item key="/admin/addproject">
              <Link to="/admin/addproject" />
              Add Project
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === '/admin/blogs'
                ? '/admin/blogs'
                : '/admin/addblog'
                ? '/admin/addblog'
                : ''
            }
            icon={<FolderOutlined />}
            title="Blog"
          >
            <Menu.Item key="/admin/blogs">
              <Link to="/admin/blogs" />
              Blogs
            </Menu.Item>
            <Menu.Item key="/admin/addblogt">
              <Link to="/admin/addblog" />
              Add Blog
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </React.Fragment>
  );
};

export default LeftNavbar;
