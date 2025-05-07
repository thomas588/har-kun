import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme, ConfigProvider, Spin } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import AppSidebar from './components/layout/AppSidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Tasbeeh from './pages/Tasbeeh';
import Hisob from './pages/Hisob';
import Mashgulot from './pages/Mashgulot';
import Talim from './pages/Talim';
import Taomnoma from './pages/Taomnoma';
import Kutubxona from './pages/Kutubxona';
import Intizom from './pages/Intizom';
import Tabobat from './pages/Tabobat';
import Fayllar from './pages/Fayllar';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Contexts & Utils
import { AuthProvider } from './contexts/AuthContext';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';

const { Content } = Layout;

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { webApp, user, initialized } = useTelegramWebApp();

  useEffect(() => {
    // Initialize the app
    const initApp = async () => {
      // Wait for Telegram WebApp initialization
      setTimeout(() => setLoading(false), 1000);
    };

    initApp();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f2f5' 
      }}>
        <Spin size="large" tip={t('loading')} />
      </div>
    );
  }

  // Check if user is on auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      <Layout style={{ minHeight: '100vh' }}>
        {!isAuthPage && (
          <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        )}
        
        <Layout>
          {!isAuthPage && (
            <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          )}
          
          <Content style={{ margin: isAuthPage ? 0 : '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasbeeh" element={<Tasbeeh />} />
              <Route path="/hisob" element={<Hisob />} />
              <Route path="/mashgulot" element={<Mashgulot />} />
              <Route path="/talim" element={<Talim />} />
              <Route path="/taomnoma" element={<Taomnoma />} />
              <Route path="/kutubxona" element={<Kutubxona />} />
              <Route path="/intizom" element={<Intizom />} />
              <Route path="/tabobat" element={<Tabobat />} />
              <Route path="/fayllar" element={<Fayllar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          
          {!isAuthPage && <AppFooter />}
        </Layout>
      </Layout>
    </AuthProvider>
  );
}

export default App;
