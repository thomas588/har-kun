import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Intizom = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('intizom')}</Title>
      <Paragraph>{t('intizomDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('intizomComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Intizom;
