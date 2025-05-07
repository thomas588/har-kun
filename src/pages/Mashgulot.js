import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Mashgulot = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('mashgulot')}</Title>
      <Paragraph>{t('mashgulotDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('mashgulotComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Mashgulot;
