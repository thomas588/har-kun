import React from 'react';
import { Typography, Row, Col, Card, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

// Components
import Counter from '../components/tasbeeh/Counter';
import PrayerTimes from '../components/tasbeeh/PrayerTimes';
import IslamicCalendar from '../components/tasbeeh/IslamicCalendar';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Tasbeeh = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Title level={2}>{t('tasbeeh')}</Title>
      <Paragraph>{t('tasbeehDescription')}</Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Counter />
        </Col>
        
        <Col xs={24} md={12}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('prayerTimes')} key="1">
              <PrayerTimes />
            </TabPane>
            <TabPane tab={t('islamicCalendar')} key="2">
              <IslamicCalendar />
            </TabPane>
            <TabPane tab={t('prayerGuide')} key="3">
              <Card title={t('prayerGuide')} bordered={false}>
                <Paragraph>{t('prayerGuideDescription')}</Paragraph>
                <ul>
                  <li>{t('prayerStep1')}</li>
                  <li>{t('prayerStep2')}</li>
                  <li>{t('prayerStep3')}</li>
                  <li>{t('prayerStep4')}</li>
                  <li>{t('prayerStep5')}</li>
                </ul>
                <Paragraph>
                  <a href="#more">{t('readMore')}</a>
                </Paragraph>
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default Tasbeeh;
