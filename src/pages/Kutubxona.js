import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Kutubxona = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('kutubxona')}</Title>
      <Paragraph>{t('kutubxonaDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('kutubxonaComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Kutubxona;
