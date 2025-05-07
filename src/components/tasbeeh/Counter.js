import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Row, Col, Tooltip, Modal, Input, Form, Select } from 'antd';
import { 
  ReloadOutlined, 
  SaveOutlined, 
  HistoryOutlined, 
  EditOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

const Counter = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(99);
  const [dhikrText, setDhikrText] = useState('SubhanAllah');
  const [showModal, setShowModal] = useState(false);
  const [dhikrHistory, setDhikrHistory] = useState([]);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Form instance
  const [form] = Form.useForm();
  
  useEffect(() => {
    // Load saved preferences
    const savedCount = localStorage.getItem('tasbeehCount');
    const savedMaxCount = localStorage.getItem('tasbeehMaxCount');
    const savedDhikrText = localStorage.getItem('tasbeehDhikrText');
    const savedVibration = localStorage.getItem('tasbeehVibration');
    const savedHistory = localStorage.getItem('tasbeehHistory');
    
    if (savedCount) setCount(parseInt(savedCount));
    if (savedMaxCount) setMaxCount(parseInt(savedMaxCount));
    if (savedDhikrText) setDhikrText(savedDhikrText);
    if (savedVibration) setVibrationEnabled(savedVibration === 'true');
    if (savedHistory) setDhikrHistory(JSON.parse(savedHistory));
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('tasbeehCount', count);
    localStorage.setItem('tasbeehMaxCount', maxCount);
    localStorage.setItem('tasbeehDhikrText', dhikrText);
    localStorage.setItem('tasbeehVibration', vibrationEnabled);
    localStorage.setItem('tasbeehHistory', JSON.stringify(dhikrHistory));
  }, [count, maxCount, dhikrText, vibrationEnabled, dhikrHistory]);
  
  const incrementCount = () => {
    if (count < maxCount) {
      setCount(count + 1);
      
      // Vibrate if enabled
      if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(20);
      }
      
      // If count reached max, vibrate differently
      if (count + 1 >= maxCount && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };
  
  const resetCounter = () => {
    // Add to history before resetting
    if (count > 0) {
      const newHistoryItem = {
        date: new Date().toISOString(),
        count,
        dhikr: dhikrText,
        maxCount
      };
      setDhikrHistory([newHistoryItem, ...dhikrHistory].slice(0, 100)); // Keep last 100 entries
    }
    setCount(0);
  };
  
  const handleSettingsSubmit = (values) => {
    setMaxCount(values.maxCount);
    setDhikrText(values.dhikrText);
    setVibrationEnabled(values.vibrationEnabled);
    setShowModal(false);
  };
  
  const handleShareSubmit = (values) => {
    // Here we would handle the sharing logic
    // For now, just log the values and close the modal
    console.log('Sharing to chat:', values.chatId);
    setShowShareModal(false);
  };
  
  const openSettingsModal = () => {
    form.setFieldsValue({
      maxCount,
      dhikrText,
      vibrationEnabled
    });
    setShowModal(true);
  };
  
  // Predefined dhikr options
  const dhikrOptions = [
    { value: 'SubhanAllah', label: 'سبحان الله' },
    { value: 'Alhamdulillah', label: 'الحمد لله' },
    { value: 'AllahuAkbar', label: 'الله أكبر' },
    { value: 'LailahaIllallah', label: 'لا إله إلا الله' },
    { value: 'AstaghfirAllah', label: 'أستغفر الله' },
  ];
  
  return (
    <>
      <Card 
        title={t('tasbeehCounter')} 
        bordered={false} 
        style={{ marginBottom: 24 }}
        extra={
          <div>
            <Tooltip title={t('resetCounter')}>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={resetCounter} 
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Tooltip title={t('settings')}>
              <Button 
                icon={<EditOutlined />} 
                onClick={openSettingsModal} 
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Tooltip title={t('share')}>
              <Button 
                icon={<ShareAltOutlined />} 
                onClick={() => setShowShareModal(true)}
              />
            </Tooltip>
          </div>
        }
      >
        <div 
          className="counter-circle"
          style={{ backgroundColor: '#e6f7ff', border: '6px solid #1890ff' }}
          onClick={incrementCount}
        >
          <div className="counter-circle-inner">
            <Text className="counter-dhikr">
              {dhikrOptions.find(d => d.value === dhikrText)?.label || dhikrText}
            </Text>
            <div className="counter-number">{count}</div>
            <div className="counter-label">{t('of')} {maxCount}</div>
          </div>
        </div>
        
        <Row justify="center" style={{ marginTop: 16 }}>
          <Col>
            <Button 
              type="primary" 
              size="large" 
              onClick={incrementCount}
              style={{ minWidth: 150 }}
            >
              {t('count')}
            </Button>
          </Col>
        </Row>
      </Card>
      
      {/* Settings Modal */}
      <Modal
        title={t('tasbeehSettings')}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSettingsSubmit}
          initialValues={{
            maxCount,
            dhikrText,
            vibrationEnabled
          }}
        >
          <Form.Item name="dhikrText" label={t('dhikrType')}>
            <Select>
              {dhikrOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="maxCount" label={t('counterLimit')}>
            <Select>
              <Option value={33}>33</Option>
              <Option value={99}>99</Option>
              <Option value={100}>100</Option>
              <Option value={500}>500</Option>
              <Option value={1000}>1000</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="vibrationEnabled" label={t('vibration')} valuePropName="checked">
            <Select>
              <Option value={true}>{t('enabled')}</Option>
              <Option value={false}>{t('disabled')}</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('save')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Share Modal */}
      <Modal
        title={t('shareStatistics')}
        open={showShareModal}
        onCancel={() => setShowShareModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleShareSubmit}
        >
          <Form.Item name="chatId" label={t('selectChat')}>
            <Select placeholder={t('selectChatToShare')}>
              <Option value="personal">{t('myMessages')}</Option>
              <Option disabled>{t('noGroupChats')}</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Text type="secondary">{t('shareDescription')}</Text>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('share')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Counter;
