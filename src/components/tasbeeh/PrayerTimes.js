import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Divider, Tag, Select, Spin } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

const PrayerTimes = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [selectedCity, setSelectedCity] = useState('tashkent');
  
  // Cities in Uzbekistan
  const cities = [
    { value: 'tashkent', label: 'Tashkent' },
    { value: 'samarkand', label: 'Samarkand' },
    { value: 'bukhara', label: 'Bukhara' },
    { value: 'andijan', label: 'Andijan' },
    { value: 'namangan', label: 'Namangan' },
    { value: 'fergana', label: 'Fergana' },
    { value: 'nukus', label: 'Nukus' },
  ];
  
  useEffect(() => {
    // Load saved city preference
    const savedCity = localStorage.getItem('prayerTimesCity');
    if (savedCity) setSelectedCity(savedCity);
    
    // Fetch prayer times
    fetchPrayerTimes(savedCity || selectedCity);
  }, []);
  
  const fetchPrayerTimes = async (city) => {
    setLoading(true);
    try {
      // In a real app, we would fetch from an API
      // For now, simulate with mock data
      setTimeout(() => {
        const mockData = getMockPrayerTimes(city);
        setPrayerTimes(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLoading(false);
    }
  };
  
  const handleCityChange = (value) => {
    setSelectedCity(value);
    localStorage.setItem('prayerTimesCity', value);
    fetchPrayerTimes(value);
  };
  
  // Mock data for demonstration
  const getMockPrayerTimes = (city) => {
    // Base times for Tashkent
    const baseTimes = {
      fajr: '04:30',
      sunrise: '06:00',
      dhuhr: '12:15',
      asr: '16:45',
      maghrib: '19:30',
      isha: '21:00',
    };
    
    // Adjust times slightly for different cities
    // In a real app, these would come from an API
    const timeOffsets = {
      tashkent: 0,
      samarkand: 5,
      bukhara: 10,
      andijan: -5,
      namangan: -3,
      fergana: -7,
      nukus: 15,
    };
    
    const offset = timeOffsets[city] || 0;
    
    const adjustTime = (timeStr, minutes) => {
      const [hours, mins] = timeStr.split(':').map(Number);
      let totalMinutes = hours * 60 + mins + minutes;
      
      // Handle overflow
      while (totalMinutes < 0) totalMinutes += 24 * 60;
      totalMinutes = totalMinutes % (24 * 60);
      
      const newHours = Math.floor(totalMinutes / 60);
      const newMins = totalMinutes % 60;
      
      return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
    };
    
    return {
      date: new Date().toLocaleDateString(),
      city: cities.find(c => c.value === city)?.label || 'Tashkent',
      times: {
        fajr: adjustTime(baseTimes.fajr, offset),
        sunrise: adjustTime(baseTimes.sunrise, offset),
        dhuhr: adjustTime(baseTimes.dhuhr, offset),
        asr: adjustTime(baseTimes.asr, offset),
        maghrib: adjustTime(baseTimes.maghrib, offset),
        isha: adjustTime(baseTimes.isha, offset),
      }
    };
  };
  
  // Get current prayer period
  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const times = [
      { name: 'fajr', time: prayerTimes.times.fajr },
      { name: 'sunrise', time: prayerTimes.times.sunrise },
      { name: 'dhuhr', time: prayerTimes.times.dhuhr },
      { name: 'asr', time: prayerTimes.times.asr },
      { name: 'maghrib', time: prayerTimes.times.maghrib },
      { name: 'isha', time: prayerTimes.times.isha },
    ];
    
    for (let i = 0; i < times.length; i++) {
      if (currentTime < times[i].time) {
        return i === 0 ? 'isha' : times[i-1].name;
      }
    }
    
    return 'isha';
  };
  
  const currentPrayer = getCurrentPrayer();
  
  return (
    <Card title={t('prayerTimes')} bordered={false}>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        <Select 
          value={selectedCity} 
          onChange={handleCityChange}
          style={{ width: 150 }}
        >
          {cities.map(city => (
            <Option key={city.value} value={city.value}>{city.label}</Option>
          ))}
        </Select>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Spin />
        </div>
      ) : prayerTimes ? (
        <div className="prayer-times-container">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Text type="secondary">{prayerTimes.date}</Text>
          </div>
          
          <List
            itemLayout="horizontal"
            dataSource={[
              { prayer: 'fajr', name: t('fajr'), time: prayerTimes.times.fajr },
              { prayer: 'sunrise', name: t('sunrise'), time: prayerTimes.times.sunrise },
              { prayer: 'dhuhr', name: t('dhuhr'), time: prayerTimes.times.dhuhr },
              { prayer: 'asr', name: t('asr'), time: prayerTimes.times.asr },
              { prayer: 'maghrib', name: t('maghrib'), time: prayerTimes.times.maghrib },
              { prayer: 'isha', name: t('isha'), time: prayerTimes.times.isha },
            ]}
            renderItem={item => (
              <div className="prayer-time-row">
                <div className="prayer-name">
                  {item.name}
                  {currentPrayer === item.prayer && (
                    <Tag color="green" style={{ marginLeft: 8 }}>{t('current')}</Tag>
                  )}
                </div>
                <div className="prayer-time">
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  {item.time}
                </div>
              </div>
            )}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Text type="secondary">{t('unableToLoadPrayerTimes')}</Text>
        </div>
      )}
    </Card>
  );
};

export default PrayerTimes;
