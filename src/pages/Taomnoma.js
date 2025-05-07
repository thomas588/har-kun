import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Taomnoma = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('taomnoma')}</Title>
      <Paragraph>{t('taonomaDescription')}</Paragraph>
      
      <Card title={t('comingSoon')} bordered={false}>
        <Paragraph>{t('taonomaComingSoonMessage')}</Paragraph>
      </Card>
    </div>
  );
};

export default Taomnoma;
