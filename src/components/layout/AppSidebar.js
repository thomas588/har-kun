import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  CalculatorOutlined, 
  BookOutlined, 
  FileOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  ReadOutlined,
  CoffeeOutlined,
  FieldTimeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Sider } = Layout;

const AppSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('dashboard'),
      onClick: () => navigate('/'),
    },
    {
      key: '/tasbeeh',
      icon: <FieldTimeOutlined />,
      label: t('tasbeeh'),
      onClick: () => navigate('/tasbeeh'),
    },
    {
      key: '/hisob',
      icon: <CalculatorOutlined />,
      label: t('hisob'),
      onClick: () => navigate('/hisob'),
    },
    {
      key: '/mashgulot',
      icon: <CalendarOutlined />,
      label: t('mashgulot'),
      onClick: () => navigate('/mashgulot'),
    },
    {
      key: '/talim',
      icon: <ReadOutlined />,
      label: t('talim'),
      onClick: () => navigate('/talim'),
    },
    {
      key: '/taomnoma',
      icon: <CoffeeOutlined />,
      label: t('taomnoma'),
      onClick: () => navigate('/taomnoma'),
    },
    {
      key: '/kutubxona',
      icon: <BookOutlined />,
      label: t('kutubxona'),
      onClick: () => navigate('/kutubxona'),
    },
    {
      key: '/intizom',
      icon: <CalendarOutlined />,
      label: t('intizom'),
      onClick: () => navigate('/intizom'),
    },
    {
      key: '/tabobat',
      icon: <MedicineBoxOutlined />,
      label: t('tabobat'),
      onClick: () => navigate('/tabobat'),
    },
    {
      key: '/fayllar',
      icon: <FileOutlined />,
      label: t('fayllar'),
      onClick: () => navigate('/fayllar'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('settings'),
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth="80"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <div className="app-logo">
        {collapsed ? 'HK' : 'Har Kun'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSidebar;
