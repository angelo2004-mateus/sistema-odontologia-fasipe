import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaRegUser, FaBars } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }

  window.addEventListener("resize", handleResize);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
      >
        <div className="demo-logo-vertical" />
        <Menu mode="inline">
          <Menu.Item key="1" icon={<LuLayoutDashboard />}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<FaRegCalendarCheck />}>
            <NavLink
              to="/agenda"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Agenda
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<FaRegUser />}>
            <NavLink
              to="/paciente"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Paciente
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<TbHealthRecognition />}>
            <NavLink
              to="/profissional"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profissional
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<IoDocumentTextOutline />}>
            <NavLink
              to="/anamnese"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Anamnese
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{background: 'white'}}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            className="menu-btn"
            type="text"
            icon={collapsed ? <FaBars /> : <FaBars />} 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "0px 16px",
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "hidden",
          }}
        >
          {/* Aqui renderizamos o conteúdo dos filhos */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
