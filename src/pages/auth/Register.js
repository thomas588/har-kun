import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // In a real app, we would handle registration here
      console.log('Registration form submitted:', values);
      
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message and redirect
      message.success(t('registrationSuccess'));
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      message.error(t('registrationError'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '40px 0' }}>
      <Card bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>{t('register')}</Title>
          <Text type="secondary">{t('registerSubtitle')}</Text>
        </div>
        
        <Form
          name="register"
          initialValues={{ agreement: true }}
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
            name="email"
            rules={[
              { required: true, message: t('emailRequired') },
              { type: 'email', message: t('invalidEmail') }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder={t('emailPlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item
            name="phone"
            rules={[{ required: true, message: t('phoneRequired') }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder={t('phonePlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('passwordRequired') },
              { min: 6, message: t('passwordTooShort') }
            ]}
            hasFeedback
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={t('passwordPlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t('confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('passwordsDontMatch')));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={t('confirmPasswordPlaceholder')} 
            />
          </Form.Item>
          
          <Form.Item
            name="language"
            rules={[{ required: true, message: t('languageRequired') }]}
          >
            <Select placeholder={t('selectLanguage')}>
              <Option value="uz">O'zbek</Option>
              <Option value="ru">Русский</Option>
              <Option value="en">English</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error(t('agreementRequired'))),
              },
            ]}
          >
            <Checkbox>
              {t('agreeToTerms')} <a href="#terms">{t('termsOfService')}</a>
            </Checkbox>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%' }}
              loading={loading}
            >
              {t('register')}
            </Button>
          </Form.Item>
          
          <Divider>{t('or')}</Divider>
          
          <div style={{ textAlign: 'center' }}>
            <Text>{t('alreadyHaveAccount')} </Text>
            <Link to="/login">{t('login')}</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
