import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Hisob = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('hisob')}</Title>
      <Paragraph>{t('hisobDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('hisobComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Hisob;
