import React from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar, Badge } from 'antd';
import { BellOutlined, UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TranslationOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const userMenu = [
    {
      key: 'profile',
      label: t('profile'),
      icon: <UserOutlined />,
      onClick: () => navigate('/settings/profile'),
    },
    {
      key: 'settings',
      label: t('settings'),
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: t('logout'),
      danger: true,
      onClick: () => {
        // Handle logout logic
        navigate('/login');
      },
    },
  ];

  const languageMenu = [
    {
      key: 'uz',
      label: "O'zbek",
      onClick: () => changeLanguage('uz'),
    },
    {
      key: 'ru',
      label: 'Русский',
      onClick: () => changeLanguage('ru'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => changeLanguage('en'),
    },
  ];

  const notificationMenu = [
    {
      key: '1',
      label: t('notificationExample'),
    },
    {
      key: '2',
      label: t('seeAllNotifications'),
      onClick: () => navigate('/notifications'),
    },
  ];

  return (
    <Header style={{ padding: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
        <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
          <Button type="text" icon={<TranslationOutlined />} style={{ marginRight: 8 }} />
        </Dropdown>
        
        <Dropdown menu={{ items: notificationMenu }} placement="bottomRight">
          <Badge count={2} size="small">
            <Button type="text" icon={<BellOutlined />} style={{ marginRight: 16 }} />
          </Badge>
        </Dropdown>
        
        <Dropdown menu={{ items: userMenu }} placement="bottomRight">
          <Space>
            <Avatar icon={<UserOutlined />} className="user-avatar" />
            <span>User Name</span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
