import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons components
const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"/>
    <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5z"/>
    <path d="M4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4z"/>
    <path d="M14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6z"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18"/>
    <path d="M7 14l4-4 4 4 4-4"/>
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <path d="M3 6h18"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const ChevronIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path?: string;
  submenu?: NavItem[];
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>('');

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      id: 'Leads',
      title: 'Leads',
      icon: <OrdersIcon />,
      path: '/leads'
    },
    {
      id: 'analytics',
      title: 'Analiticas',
      icon: <AnalyticsIcon />,
      submenu: [
        {
          id: 'analytics-overview',
          title: 'Overview',
          path: '/analytics/overview'
        },
        {
          id: 'analytics-reports',
          title: 'Reportes',
          submenu: [
            {
              id: 'analytics-reports-sales',
              title: 'Reporte de ventas',
              path: '/analytics/reports/sales'
            },
            {
              id: 'analytics-reports-traffic',
              title: 'Traffic Analysis',
              path: '/analytics/reports/traffic'
            }
          ]
        }
      ]
    }
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => !id.startsWith(itemId))
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => {
    return expandedItems.some(id => id === itemId);
  };

  const isActive = (itemId: string) => {
    return activeItem === itemId;
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isItemExpanded = isExpanded(item.id);
    const isItemActive = isActive(item.id);

    return (
      <div key={item.id} className="w-full">
        <Link
          to={item.path || '#'}
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.id);
            } else {
              setActiveItem(item.id);
            }
          }}
          className={`
            w-full flex items-center px-4 py-2.5 text-sm
            ${level > 0 ? 'pl-' + (level * 4 + 4) : ''}
            ${isItemActive ? 'text-white bg-blue-600' : 'text-gray-300 hover:bg-gray-700/50'}
            transition-all duration-200 ease-in-out
            rounded-lg mx-2 gap-3
          `}
        >
          {item.icon && (
            <span className={`flex-shrink-0 ${isItemActive ? 'text-white' : 'text-gray-400'}`}>
              {item.icon}
            </span>
          )}
          
          {!isCollapsed && (
            <>
              <span className="flex-grow text-left whitespace-nowrap">
                {item.title}
              </span>
              
              {hasSubmenu && (
                <span className={`transform transition-transform duration-200 ${isItemExpanded ? 'rotate-180' : ''}`}>
                  <ChevronIcon />
                </span>
              )}
            </>
          )}
        </Link>

        {/* Submenu */}
        {hasSubmenu && !isCollapsed && (
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isItemExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {item.submenu && item.submenu.map(subItem => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`
        relative min-h-screen bg-gray-800 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        border-r border-gray-700
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-white">CRM-QSAR</span>
          )}
        </div>
        
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 mt-2 space-y-1">
        {navItems.map(item => renderNavItem(item))}
      </nav>
    </aside>
  );
};

export default Sidebar;