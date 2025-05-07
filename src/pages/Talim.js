import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Talim = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('talim')}</Title>
      <Paragraph>{t('talimDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('talimComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Talim;
