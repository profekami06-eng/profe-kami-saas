import React, { useState } from 'react';
import { Sidebar, type AdminModule } from '../components/admin/Sidebar';
import { TopBar } from '../components/admin/TopBar';
import { ModuloHoy } from '../components/admin/ModuloHoy';
import { ModuloAgenda } from '../components/admin/ModuloAgenda';
import { ModuloFinanzas } from '../components/admin/ModuloFinanzas';
import { ModuloEstudiantes } from '../components/admin/ModuloEstudiantes';
import { ModuloServicios } from '../components/admin/ModuloServicios';
import { ModuloReportes } from '../components/admin/ModuloReportes';
import { ModuloAjustes } from '../components/admin/ModuloAjustes';

/**
 * AdminDashboard — Panel de Control Principal de Profe Kami
 * 
 * Layout: Sidebar fijo (desktop) + TopBar + área de contenido con los 7 módulos.
 * Seguridad: Solo accesible si el usuario autenticado es profekami06@gmail.com.
 */
export const AdminDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AdminModule>('hoy');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'hoy':
        return <ModuloHoy />;
      case 'agenda':
        return <ModuloAgenda />;
      case 'finanzas':
        return <ModuloFinanzas />;
      case 'estudiantes':
        return <ModuloEstudiantes />;
      case 'servicios':
        return <ModuloServicios />;
      case 'reportes':
        return <ModuloReportes />;
      case 'ajustes':
        return <ModuloAjustes />;
      default:
        return <ModuloHoy />;
    }
  };

  return (
    <div className="min-h-screen bg-calido-50 flex">
      {/* Sidebar Lateral */}
      <Sidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Columna Principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* TopBar */}
        <TopBar
          activeModule={activeModule}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        {/* Área de contenido del módulo activo */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
