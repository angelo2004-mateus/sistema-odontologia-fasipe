import { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbHealthRecognition } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'; // Importando o NavLink

const Navbar = () => {
  const [active, setActive] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/', notifications: 0 },
    { name: 'Agenda', icon: <MdOutlineCalendarToday />, path: '/a', notifications: 0 },
    { name: 'Paciente', icon: <FaRegUser />, path: '/b', notifications: 0 },
    { name: 'Profissionais', icon: <TbHealthRecognition  />, path: '/c', notifications: 0 },
    { name: 'Anmense', icon: <IoDocumentTextOutline  />, path: '/d', notifications: 0 },
  ];

  return (
    <div className="h-full w-[300px] bg-green-primary text-white flex flex-col justify-between">
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
    </div>
  );
};

export default Navbar;
