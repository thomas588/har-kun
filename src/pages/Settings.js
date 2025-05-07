import React from 'react';
import { Typography, Tabs, Form, Input, Button, Select, Switch, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
  const { t, i18n } = useTranslation();
  
  const onProfileFinish = (values) => {
    console.log('Profile form submitted:', values);
    message.success(t('profileUpdated'));
  };
  
  const onPasswordFinish = (values) => {
    console.log('Password form submitted:', values);
    message.success(t('passwordUpdated'));
  };
  
  const onNotificationFinish = (values) => {
    console.log('Notification settings submitted:', values);
    message.success(t('notificationSettingsUpdated'));
  };
  
  const onLanguageChange = (value) => {
    i18n.changeLanguage(value);
    message.success(t('languageChanged'));
  };
  
  const onPrivacyFinish = (values) => {
    console.log('Privacy settings submitted:', values);
    message.success(t('privacySettingsUpdated'));
  };
  
  return (
    <div>
      <Title level={2}>{t('settings')}</Title>
      <Paragraph>{t('settingsDescription')}</Paragraph>
      
      <Tabs defaultActiveKey="profile">
        <TabPane 
          tab={
            <span>
              <UserOutlined />
              {t('profile')}
            </span>
          } 
          key="profile"
        >
          <Card bordered={false}>
            <Form
              layout="vertical"
              onFinish={onProfileFinish}
              initialValues={{
                name: 'User Name',
                email: 'user@example.com',
                phone: '+998 90 123 4567',
              }}
            >
              <Form.Item
                name="name"
                label={t('fullName')}
                rules={[{ required: true, message: t('nameRequired') }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="email"
                label={t('email')}
                rules={[
                  { required: true, message: t('emailRequired') },
                  { type: 'email', message: t('invalidEmail') }
                ]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label={t('phone')}
                rules={[{ required: true, message: t('phoneRequired') }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('saveChanges')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <LockOutlined />
              {t('security')}
            </span>
          } 
          key="security"
        >
          <Card bordered={false}>
            <Form
              layout="vertical"
              onFinish={onPasswordFinish}
            >
              <Form.Item
                name="currentPassword"
                label={t('currentPassword')}
                rules={[{ required: true, message: t('currentPasswordRequired') }]}
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label={t('newPassword')}
                rules={[
                  { required: true, message: t('newPasswordRequired') },
                  { min: 6, message: t('passwordTooShort') }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label={t('confirmPassword')}
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: t('confirmPasswordRequired') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('passwordsDontMatch')));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('updatePassword')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <BellOutlined />
              {t('notifications')}
            </span>
          } 
          key="notifications"
        >
          <Card bordered={false}>
            <Form
              layout="vertical"
              onFinish={onNotificationFinish}
              initialValues={{
                prayerReminders: true,
                dailyReminders: true,
                appUpdates: true,
                marketingEmails: false,
              }}
            >
              <Form.Item
                name="prayerReminders"
                label={t('prayerReminders')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="dailyReminders"
                label={t('dailyReminders')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="appUpdates"
                label={t('appUpdates')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="marketingEmails"
                label={t('marketingEmails')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('saveChanges')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <GlobalOutlined />
              {t('language')}
            </span>
          } 
          key="language"
        >
          <Card bordered={false}>
            <Title level={4}>{t('languagePreference')}</Title>
            <Paragraph>{t('languageDescription')}</Paragraph>
            
            <div style={{ marginBottom: 16 }}>
              <Select
                defaultValue={i18n.language}
                style={{ width: 200 }}
                onChange={onLanguageChange}
              >
                <Option value="uz">O'zbek</Option>
                <Option value="ru">Русский</Option>
                <Option value="en">English</Option>
              </Select>
            </div>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <UserOutlined />
              {t('privacy')}
            </span>
          } 
          key="privacy"
        >
          <Card bordered={false}>
            <Form
              layout="vertical"
              onFinish={onPrivacyFinish}
              initialValues={{
                showInLeaderboard: true,
                shareStatistics: true,
                allowDataCollection: true,
              }}
            >
              <Form.Item
                name="showInLeaderboard"
                label={t('showInLeaderboard')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="shareStatistics"
                label={t('shareStatistics')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="allowDataCollection"
                label={t('allowDataCollection')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <Title level={5}>{t('dataManagement')}</Title>
              <Paragraph>{t('dataManagementDescription')}</Paragraph>
              
              <Button danger style={{ marginRight: 8 }}>
                {t('downloadData')}
              </Button>
              
              <Button danger type="primary">
                {t('deleteAccount')}
              </Button>
              
              <Form.Item style={{ marginTop: 16 }}>
                <Button type="primary" htmlType="submit">
                  {t('saveChanges')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
