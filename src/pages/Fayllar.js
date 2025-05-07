import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Fayllar = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('fayllar')}</Title>
      <Paragraph>{t('fayllarDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('fayllarComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Fayllar;
