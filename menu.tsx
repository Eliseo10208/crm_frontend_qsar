import React from 'react';

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path?: string;
  submenu?: NavItem[];
}

const DashboardIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"/>
    <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5z"/>
    <path d="M4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4z"/>
    <path d="M14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6z"/>
  </svg>
);

const AnalyticsIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18"/>
    <path d="M7 14l4-4 4 4 4-4"/>
  </svg>
);

const OrdersIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <path d="M3 6h18"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const ChevronIcon: React.FC = () => (
  <svg className="w-4 h-4 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    id: 'leads',
    title: 'Leads',
    icon: <OrdersIcon />,
    path: '/leads'
  },
  {
    id: 'analytics',
    title: 'Analíticas',
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
            title: 'Análisis de tráfico',
            path: '/analytics/reports/traffic'
          }
        ]
      }
    ]
  }
];

export default navItems;
