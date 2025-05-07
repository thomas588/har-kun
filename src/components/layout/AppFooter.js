import React from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <Footer style={{ textAlign: 'center', background: '#fff' }}>
      <Text type="secondary">
        {t('footerCopyright', { year: currentYear })}
      </Text>
    </Footer>
  );
};

export default AppFooter;
