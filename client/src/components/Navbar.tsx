import { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbHealthRecognition } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'; // Importando o NavLink
import { Modal, Input, Button, notification } from 'antd'; // Importando o Modal e Inputs do Ant Design
import { FaCog } from "react-icons/fa"; // Ícone de configuração

const Navbar = () => {
  const [active, setActive] = useState('Dashboard');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [color, setColor] = useState('#000000'); // Cor da Navbar

  const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/', notifications: 0 },
    { name: 'Agenda', icon: <MdOutlineCalendarToday />, path: '/a', notifications: 0 },
    { name: 'Paciente', icon: <FaRegUser />, path: '/b', notifications: 0 },
    { name: 'Profissionais', icon: <TbHealthRecognition />, path: '/c', notifications: 0 },
    { name: 'Anmense', icon: <IoDocumentTextOutline />, path: '/d', notifications: 0 },
  ];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setLogoFile(file);
    }
  };

  const saveConfig = async () => {
    // Aqui você pode fazer a chamada ao backend para salvar a cor e logo
    // Você pode usar axios para enviar os dados para o backend.

    notification.success({
      message: 'Configuração salva',
      description: 'A cor e a logo da navbar foram atualizadas.',
    });

    setIsModalVisible(false);
  };

  return (
    <div className="h-full w-[300px] bg-green-primary text-white flex flex-col justify-between" style={{ backgroundColor: color }}>
      <div className="px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Fasipe Odonto</h2>
        </div>
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2 rounded mb-2 cursor-pointer ${
                  isActive ? 'bg-green-primary-foreground' : ''
                }`
              }
              onClick={() => setActive(item.name)}
            >
              <div className="flex items-center space-x-3">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {item.notifications > 0 && (
                <span className="bg-emerald-900 text-xs px-2 py-1 rounded-full">
                  {item.notifications}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Ícone de configuração no rodapé */}
      <div className="px-4 py-6 mt-auto">
        <Button
          icon={<FaCog />}
          type="text"
          onClick={() => setIsModalVisible(true)}
        >
          Configurações
        </Button>
      </div>

      {/* Modal de Configuração */}
      <Modal
        title="Configurações da Navbar"
        visible={isModalVisible}
        onOk={saveConfig}
        onCancel={() => setIsModalVisible(false)}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <div className="mb-4">
          <label>Cor de fundo</label>
          <Input type="color" value={color} onChange={handleColorChange} />
        </div>
        <div className="mb-4">
          <label>Logo</label>
          <Input type="file" onChange={handleLogoChange} />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
