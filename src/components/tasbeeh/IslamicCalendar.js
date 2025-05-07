import React, { useState, useEffect } from 'react';
import { Card, Typography, Calendar, Badge } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const IslamicCalendar = () => {
  const { t } = useTranslation();
  const [hijriDate, setHijriDate] = useState(null);
  const [importantDates, setImportantDates] = useState([]);
  
  useEffect(() => {
    // Calculate Hijri date
    calculateHijriDate();
    
    // Load important Islamic dates
    loadImportantDates();
  }, []);
  
  const calculateHijriDate = () => {
    // In a real app, this would use a proper Hijri calendar library
    // For now, we'll use a mock calculation
    
    // Get current Gregorian date
    const today = new Date();
    
    // Mock Hijri date calculation (this is not accurate)
    const hijriYear = today.getFullYear() - 579; // Rough approximation
    const hijriMonth = getHijriMonth(today.getMonth());
    const hijriDay = Math.min(today.getDate(), 30); // Simplistic approach
    
    setHijriDate({
      day: hijriDay,
      month: hijriMonth.name,
      monthNum: hijriMonth.num,
      year: hijriYear,
      gregorian: today.toLocaleDateString()
    });
  };
  
  const getHijriMonth = (gregorianMonth) => {
    // This is a simplistic mapping and not accurate
    const hijriMonths = [
      { num: 1, name: 'Muharram' },
      { num: 2, name: 'Safar' },
      { num: 3, name: 'Rabi al-Awwal' },
      { num: 4, name: 'Rabi al-Thani' },
      { num: 5, name: 'Jumada al-Awwal' },
      { num: 6, name: 'Jumada al-Thani' },
      { num: 7, name: 'Rajab' },
      { num: 8, name: 'Sha\'ban' },
      { num: 9, name: 'Ramadan' },
      { num: 10, name: 'Shawwal' },
      { num: 11, name: 'Dhu al-Qa\'dah' },
      { num: 12, name: 'Dhu al-Hijjah' },
    ];
    
    // For mock data, just offset by 2 months (not accurate)
    const adjustedMonth = (gregorianMonth + 2) % 12;
    return hijriMonths[adjustedMonth];
  };
  
  const loadImportantDates = () => {
    // These would be calculated properly in a real app
    // Mock data for important Islamic dates
    const mockImportantDates = [
      { title: 'Start of Ramadan', date: '2025-03-01' },
      { title: 'Laylat al-Qadr', date: '2025-03-27' },
      { title: 'Eid al-Fitr', date: '2025-04-01' },
      { title: 'Day of Arafah', date: '2025-06-08' },
      { title: 'Eid al-Adha', date: '2025-06-09' },
    ];
    
    setImportantDates(mockImportantDates);
  };
  
  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    
    const matchingEvents = importantDates.filter(date => 
      date.date === dateString
    );
    
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {matchingEvents.map((event, index) => (
          <li key={index}>
            <Badge 
              status="success" 
              text={<Text style={{ fontSize: '10px' }}>{event.title}</Text>} 
            />
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <Card title={t('islamicCalendar')} bordered={false}>
      {hijriDate && (
        <div className="islamic-date">
          <div className="islamic-date-gregorian">
            {hijriDate.gregorian}
          </div>
          <div className="islamic-date-hijri">
            {hijriDate.day} {hijriDate.month} {hijriDate.year}
          </div>
        </div>
      )}
      
      <Calendar 
        fullscreen={false} 
        dateCellRender={dateCellRender}
      />
      
      <div style={{ marginTop: 16 }}>
        <Title level={5}>{t('upcomingIslamicEvents')}</Title>
        <ul>
          {importantDates.map((event, index) => (
            <li key={index}>
              <Text strong>{event.title}</Text>: {event.date}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default IslamicCalendar;
