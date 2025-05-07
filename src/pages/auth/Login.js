import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // In a real app, we would handle authentication here
      console.log('Login form submitted:', values);
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message and redirect
      message.success(t('loginSuccess'));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      message.error(t('loginError'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '40px 0' }}>
      <Card bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>{t('login')}</Title>
          <Text type="secondary">{t('loginSubtitle')}</Text>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('usernameRequired') }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('usernamePlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: t('passwordRequired') }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={t('passwordPlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('rememberMe')}</Checkbox>
            </Form.Item>
            
            <a 
              style={{ float: 'right' }}
              href="#forgot-password"
            >
              {t('forgotPassword')}
            </a>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%' }}
              loading={loading}
            >
              {t('login')}
            </Button>
          </Form.Item>
          
          <Divider>{t('or')}</Divider>
          
          <div style={{ textAlign: 'center' }}>
            <Text>{t('dontHaveAccount')} </Text>
            <Link to="/register">{t('register')}</Link>
          </div>
        </Form>
      </Card>
      
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="link" onClick={() => navigate('/')}>
          {t('continueAsGuest')}
        </Button>
      </div>
    </div>
  );
};

export default Login;
