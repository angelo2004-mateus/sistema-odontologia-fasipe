import React, { useState, useEffect } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarCheck, FaRegUser, FaBars, FaCog } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  Button,
  Layout,
  Menu,
  theme,
  Modal,
  Input,
  notification,
  Radio,
} from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getUserLoggedName } from "@/utils/getUserLoggedName";

const { Header, Sider, Content } = Layout;

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [color, setColor] = useState("#2C691C"); // Cor primária inicial
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoId, setLogoId] = useState<string | null>(null); // Armazenando o id do logo

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:3000/config/obter");
        const { id, cor, logo } = response.data;

        setColor(cor);
        setLogoUrl(`http://localhost:3000/${logo.replace("\\", "/")}`);
        setLogoId(id); // Armazenando o id do logo

        // Atualiza a cor na variável CSS
        document.documentElement.style.setProperty("--primary", cor);
        updateSecondaryTertiaryColors(cor);
      } catch (error) {
        console.error("Erro ao obter configuração:", error);
        notification.error({
          message: "Erro ao carregar configurações",
          description: "Ocorreu um erro ao carregar as configurações.",
        });
      }
    };

    fetchConfig();
  }, []);

  const handleResize = () => {
    setCollapsed(window.innerWidth < 1000);
  };

  window.addEventListener("resize", handleResize);

  // Função para aplicar as cores secundária e terciária com base na cor primária escolhida
  const updateSecondaryTertiaryColors = (primaryColor: string) => {
    // Cores predefinidas para as secundárias e terciárias
    const colorMap = {
      "#2C691C": { secondary: "#5B8F2D", tertiary: "#275a1a" },
      "#000000": { secondary: "#333333", tertiary: "#1a1a1a" },
      "#003366": { secondary: "#336699", tertiary: "#002244" },
      "#66CCFF": { secondary: "#4DB8FF", tertiary: "#3399CC" },
      "#99CC66": { secondary: "#66B34D", tertiary: "#4D7D33" },
      "#FFD700": { secondary: "#FFCC00", tertiary: "#B8860B" },
      "#800000": { secondary: "#9B111E", tertiary: "#6A0D1B" },
    };

    const colors = colorMap[primaryColor] || {
      secondary: "#5B8F2D",
      tertiary: "#275a1a",
    };

    document.documentElement.style.setProperty("--secondary", colors.secondary);
    document.documentElement.style.setProperty("--tertiary", colors.tertiary);
  };

  const handleColorChange = (e: any) => {
    const newColor = e.target.value;
    setColor(newColor);

    // Atualizar a cor primária e as secundária/terciária
    document.documentElement.style.setProperty("--primary", newColor);
    updateSecondaryTertiaryColors(newColor);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setLogoFile(file);
    }
  };

  const saveConfig = async () => {
    const formData = new FormData();
    formData.append("color", color);

    // Se logoFile existir, isso significa que estamos enviando um novo logo
    if (logoFile) {
      formData.append("logoFile", logoFile); // Envia o novo arquivo de logo
      formData.append("logoId", "null"); // Envia 'null' para indicar que é uma nova imagem
    } else {
      // Se logoId existir (o logo não foi alterado), envia o ID do logo atual
      formData.append("logoId", logoId ? logoId : "null"); // Envia o ID da logo ou 'null' se logo não for alterado
    }

    try {
      // Alterado para PUT (atualizando a configuração existente)
      const response = await axios.post(
        "http://localhost:3000/config/salvar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notification.success({
        message: "Configuração salva",
        description: "A cor e a logo foram atualizadas com sucesso.",
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao enviar configuração:", error);
      notification.error({
        message: "Erro ao salvar configuração",
        description: "Ocorreu um erro ao salvar as configurações.",
      });
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
      >
        <div
          className="demo-logo-vertical"
          style={{ paddingTop: "20px", display: "flex" }}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                maxWidth: "100%",
                maxHeight: "60px",
                objectFit: "contain",
                margin: "auto",
              }}
            />
          )}
        </div>
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
          <Menu.Item
            key="6"
            icon={<FaCog />}
            onClick={() => setIsModalVisible(true)}
          >
            Configurações
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ background: "white" }}>
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
          <b>Seja bem-vindo {getUserLoggedName()}</b>
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
          {children}
        </Content>
      </Layout>

      <Modal
        title="Configurações do sistema"
        visible={isModalVisible}
        onOk={saveConfig}
        onCancel={() => setIsModalVisible(false)}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <div className="mb-4">
          <Radio.Group value={color} onChange={handleColorChange}>
            <Radio.Button
              value="#2C691C"
              style={{ backgroundColor: "#2C691C" }}
            />
            <Radio.Button
              value="#000000"
              style={{ backgroundColor: "#000000" }}
            />
            <Radio.Button
              value="#003366"
              style={{ backgroundColor: "#003366" }}
            />
            <Radio.Button
              value="#66CCFF"
              style={{ backgroundColor: "#66CCFF" }}
            />
            <Radio.Button
              value="#99CC66"
              style={{ backgroundColor: "#99CC66" }}
            />
            <Radio.Button
              value="#FFD700"
              style={{ backgroundColor: "#FFD700" }}
            />
            <Radio.Button
              value="#800000"
              style={{ backgroundColor: "#800000" }}
            />
          </Radio.Group>
        </div>

        {/* Exibe a logo atual, se existir */}
        {logoUrl && (
          <div className="mb-4">
            <label>Logo atual</label>
            <img
              src={logoUrl}
              alt="Logo atual"
              style={{ width: "100px", height: "auto", objectFit: "contain" }}
            />
          </div>
        )}

        <div className="mb-4">
          <label>Logo</label>
          <Input type="file" onChange={handleLogoChange} />
        </div>
      </Modal>
    </Layout>
  );
};

export default BaseLayout;
