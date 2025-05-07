import React from 'react';
import { Typography, Row, Col, Card, Statistic, Button, List, Avatar } from 'antd';
import { 
  AppstoreOutlined, 
  StarOutlined, 
  UserOutlined,
  FieldTimeOutlined, 
  BookOutlined,
  CalendarOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Mock data for frequently used apps
  const frequentApps = [
    {
      title: 'Tasbeeh',
      icon: <FieldTimeOutlined style={{ fontSize: 24, color: '#1e8e3e' }} />,
      path: '/tasbeeh',
      description: t('tasbeehShortDesc')
    },
    {
      title: 'Hisob',
      icon: <AppstoreOutlined style={{ fontSize: 24, color: '#1e8e3e' }} />,
      path: '/hisob',
      description: t('hisobShortDesc')
    },
    {
      title: 'Mashg\'ulot',
      icon: <CalendarOutlined style={{ fontSize: 24, color: '#1e8e3e' }} />,
      path: '/mashgulot',
      description: t('mashgulotShortDesc')
    },
    {
      title: 'Ta\'lim',
      icon: <ReadOutlined style={{ fontSize: 24, color: '#1e8e3e' }} />,
      path: '/talim',
      description: t('talimShortDesc')
    },
  ];
  
  return (
    <div>
      <Title level={2}>{t('dashboard')}</Title>
      <Paragraph>{t('dashboardWelcome')}</Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic 
              title={t('streak')} 
              value={7} 
              prefix={<StarOutlined />} 
              suffix={t('days')}
            />
            <Paragraph style={{ marginTop: 16 }}>
              {t('streakMessage')}
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic 
              title={t('tasbeehCount')} 
              value={352} 
              prefix={<FieldTimeOutlined />}
              suffix={t('today')}
            />
            <Button 
              type="primary" 
              style={{ marginTop: 16 }}
              onClick={() => navigate('/tasbeeh')}
            >
              {t('countNow')}
            </Button>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic 
              title={t('completedTasks')} 
              value={3} 
              prefix={<CalendarOutlined />}
              suffix="/5"
            />
            <Button 
              style={{ marginTop: 16 }}
              onClick={() => navigate('/intizom')}
            >
              {t('viewTasks')}
            </Button>
          </Card>
        </Col>
      </Row>
      
      <Title level={4} style={{ marginTop: 24 }}>{t('frequentlyUsed')}</Title>
      <Row gutter={[16, 16]}>
        {frequentApps.map((app, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card 
              hoverable
              onClick={() => navigate(app.path)}
              style={{ textAlign: 'center', height: '100%' }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>
                {app.icon}
              </div>
              <Title level={5}>{app.title}</Title>
              <Text type="secondary">{app.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Title level={4} style={{ marginTop: 24 }}>{t('leaderboard')}</Title>
      <Card bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={[
            { user: 'User1', points: 1250 },
            { user: 'User2', points: 980 },
            { user: 'User3', points: 850 },
            { user: 'User4', points: 720 },
            { user: 'User5', points: 680 },
          ]}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ 
                      backgroundColor: index === 0 ? '#ffd700' : 
                                      index === 1 ? '#c0c0c0' : 
                                      index === 2 ? '#cd7f32' : '#1e8e3e' 
                    }}
                  />
                }
                title={<span>{index + 1}. {item.user}</span>}
                description={`${item.points} ${t('points')}`}
              />
            </List.Item>
          )}
        />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary">{t('yourRank')}: 15</Text>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
