import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Tabobat = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('tabobat')}</Title>
      <Paragraph>{t('tabobatDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('tabobatComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Tabobat;
