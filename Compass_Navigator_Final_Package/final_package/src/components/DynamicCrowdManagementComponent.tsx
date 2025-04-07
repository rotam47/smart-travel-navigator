import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { Users, Clock, MapPin, AlertTriangle, Check, X } from 'lucide-react';

interface DynamicCrowdManagementProps {
  className?: string;
}

export function DynamicCrowdManagementComponent({ className = '' }: DynamicCrowdManagementProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('realtime');
  const [loading, setLoading] = useState(false);
  
  // Sample crowd data
  const [crowdData, setCrowdData] = useState({
    realtime: [
      {
        id: 1,
        name: 'Hagia Sophia',
        crowdLevel: 'high',
        waitTime: 45,
        bestTimeToday: '17:00',
        currentVisitors: 850,
        capacity: 1000,
        trend: 'increasing',
        lastUpdated: '5 minutes ago'
      },
      {
        id: 2,
        name: 'Blue Mosque',
        crowdLevel: 'medium',
        waitTime: 20,
        bestTimeToday: '18:30',
        currentVisitors: 420,
        capacity: 800,
        trend: 'stable',
        lastUpdated: '3 minutes ago'
      },
      {
        id: 3,
        name: 'Topkapi Palace',
        crowdLevel: 'high',
        waitTime: 35,
        bestTimeToday: '16:00',
        currentVisitors: 780,
        capacity: 1200,
        trend: 'decreasing',
        lastUpdated: '7 minutes ago'
      },
      {
        id: 4,
        name: 'Grand Bazaar',
        crowdLevel: 'medium',
        waitTime: 0,
        bestTimeToday: 'now',
        currentVisitors: 1200,
        capacity: 3000,
        trend: 'stable',
        lastUpdated: '2 minutes ago'
      },
      {
        id: 5,
        name: 'Basilica Cistern',
        crowdLevel: 'low',
        waitTime: 5,
        bestTimeToday: 'now',
        currentVisitors: 120,
        capacity: 500,
        trend: 'stable',
        lastUpdated: '4 minutes ago'
      }
    ],
    forecast: [
      {
        id: 1,
        name: 'Hagia Sophia',
        crowdForecast: [
          { hour: '09:00', level: 'medium' },
          { hour: '10:00', level: 'high' },
          { hour: '11:00', level: 'high' },
          { hour: '12:00', level: 'high' },
          { hour: '13:00', level: 'high' },
          { hour: '14:00', level: 'high' },
          { hour: '15:00', level: 'high' },
          { hour: '16:00', level: 'medium' },
          { hour: '17:00', level: 'low' },
          { hour: '18:00', level: 'low' }
        ],
        bestTimeToVisit: '17:00 - 18:00',
        dayOfWeek: 'Monday'
      },
      {
        id: 2,
        name: 'Blue Mosque',
        crowdForecast: [
          { hour: '09:00', level: 'low' },
          { hour: '10:00', level: 'medium' },
          { hour: '11:00', level: 'medium' },
          { hour: '12:00', level: 'high' },
          { hour: '13:00', level: 'high' },
          { hour: '14:00', level: 'medium' },
          { hour: '15:00', level: 'medium' },
          { hour: '16:00', level: 'medium' },
          { hour: '17:00', level: 'medium' },
          { hour: '18:00', level: 'low' }
        ],
        bestTimeToVisit: '09:00 - 10:00 or 18:00 - 19:00',
        dayOfWeek: 'Monday'
      },
      {
        id: 3,
        name: 'Topkapi Palace',
        crowdForecast: [
          { hour: '09:00', level: 'medium' },
          { hour: '10:00', level: 'high' },
          { hour: '11:00', level: 'high' },
          { hour: '12:00', level: 'high' },
          { hour: '13:00', level: 'high' },
          { hour: '14:00', level: 'high' },
          { hour: '15:00', level: 'medium' },
          { hour: '16:00', level: 'medium' },
          { hour: '17:00', level: 'low' },
          { hour: '18:00', level: 'low' }
        ],
        bestTimeToVisit: '16:00 - 18:00',
        dayOfWeek: 'Monday'
      }
    ],
    weekly: [
      {
        id: 1,
        name: 'Hagia Sophia',
        weeklyForecast: [
          { day: 'Monday', level: 'medium' },
          { day: 'Tuesday', level: 'low' },
          { day: 'Wednesday', level: 'low' },
          { day: 'Thursday', level: 'medium' },
          { day: 'Friday', level: 'high' },
          { day: 'Saturday', level: 'high' },
          { day: 'Sunday', level: 'high' }
        ],
        bestDayToVisit: 'Tuesday or Wednesday',
        bestTimeOnBestDay: '16:00 - 18:00'
      },
      {
        id: 2,
        name: 'Blue Mosque',
        weeklyForecast: [
          { day: 'Monday', level: 'medium' },
          { day: 'Tuesday', level: 'medium' },
          { day: 'Wednesday', level: 'low' },
          { day: 'Thursday', level: 'low' },
          { day: 'Friday', level: 'high' },
          { day: 'Saturday', level: 'high' },
          { day: 'Sunday', level: 'high' }
        ],
        bestDayToVisit: 'Wednesday or Thursday',
        bestTimeOnBestDay: '09:00 - 11:00'
      },
      {
        id: 3,
        name: 'Topkapi Palace',
        weeklyForecast: [
          { day: 'Monday', level: 'high' },
          { day: 'Tuesday', level: 'medium' },
          { day: 'Wednesday', level: 'medium' },
          { day: 'Thursday', level: 'low' },
          { day: 'Friday', level: 'medium' },
          { day: 'Saturday', level: 'high' },
          { day: 'Sunday', level: 'high' }
        ],
        bestDayToVisit: 'Thursday',
        bestTimeOnBestDay: '15:00 - 17:00'
      }
    ]
  });
  
  // Render crowd level indicator
  const renderCrowdLevel = (level) => {
    let color = '';
    let icon = null;
    
    switch(level) {
      case 'low':
        color = 'bg-green-100 text-green-800';
        icon = <Check className="h-3 w-3 mr-1" />;
        break;
      case 'medium':
        color = 'bg-yellow-100 text-yellow-800';
        icon = <Clock className="h-3 w-3 mr-1" />;
        break;
      case 'high':
        color = 'bg-red-100 text-red-800';
        icon = <AlertTriangle className="h-3 w-3 mr-1" />;
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {icon}
        {t(`crowd.level.${level}`)}
      </span>
    );
  };
  
  // Render trend indicator
  const renderTrend = (trend) => {
    switch(trend) {
      case 'increasing':
        return (
          <span className="inline-flex items-center text-red-600 text-xs">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {t('crowd.trend.increasing')}
          </span>
        );
      case 'decreasing':
        return (
          <span className="inline-flex items-center text-green-600 text-xs">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {t('crowd.trend.decreasing')}
          </span>
        );
      case 'stable':
      default:
        return (
          <span className="inline-flex items-center text-gray-600 text-xs">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
            {t('crowd.trend.stable')}
          </span>
        );
    }
  };
  
  // Render capacity bar
  const renderCapacityBar = (current, capacity) => {
    const percentage = Math.min(100, Math.round((current / capacity) * 100));
    let color = '';
    
    if (percentage < 40) {
      color = 'bg-green-500';
    } else if (percentage < 70) {
      color = 'bg-yellow-500';
    } else {
      color = 'bg-red-500';
    }
    
    return (
      <div className="mt-1">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>{t('crowd.currentVisitors')}: {current}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${color} h-2 rounded-full`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  // Render hourly forecast
  const renderHourlyForecast = (forecast) => {
    return (
      <div className="flex space-x-2 overflow-x-auto py-2">
        {forecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center min-w-[50px]">
            <div className="text-xs font-medium text-gray-900">{hour.hour}</div>
            <div className="mt-1">
              {hour.level === 'low' && <div className="w-6 h-6 rounded-full bg-green-500"></div>}
              {hour.level === 'medium' && <div className="w-6 h-6 rounded-full bg-yellow-500"></div>}
              {hour.level === 'high' && <div className="w-6 h-6 rounded-full bg-red-500"></div>}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render weekly forecast
  const renderWeeklyForecast = (forecast) => {
    return (
      <div className="flex space-x-2 overflow-x-auto py-2">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center min-w-[60px]">
            <div className="text-xs font-medium text-gray-900">{day.day.substring(0, 3)}</div>
            <div className="mt-1">
              {day.level === 'low' && <div className="w-6 h-6 rounded-full bg-green-500"></div>}
              {day.level === 'medium' && <div className="w-6 h-6 rounded-full bg-yellow-500"></div>}
              {day.level === 'high' && <div className="w-6 h-6 rounded-full bg-red-500"></div>}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('realtime')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'realtime' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock className="h-4 w-4 inline mr-1" />
            {t('crowd.realtimeTab')}
          </button>
          <button 
            onClick={() => setActiveTab('forecast')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'forecast' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-1" />
            {t('crowd.forecastTab')}
          </button>
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'weekly' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-1" />
            {t('crowd.weeklyTab')}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t(`crowd.${activeTab}Title`)}
          </h3>
          <p className="text-sm text-gray-600">
            {t(`crowd.${activeTab}Description`)}
          </p>
        </div>
        
        {/* Realtime Tab Content */}
        {activeTab === 'realtime' && (
          <div className="space-y-6">
            {crowdData.realtime.map((location) => (
              <div key={location.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-gray-900 font-medium">{location.name}</h4>
                    <div className="mt-1 flex items-center">
                      {renderCrowdLevel(location.crowdLevel)}
                      <span className="text-xs text-gray-500 ml-2">
                        {t('crowd.lastUpdated')}: {location.lastUpdated}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {location.waitTime > 0 ? (
                        <span>{t('crowd.waitTime')}: {location.waitTime} min</span>
                      ) : (
                        <span className="text-green-600">{t('crowd.noWait')}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t('crowd.bestTimeToday')}: {location.bestTimeToday}
                    </div>
                  </div>
                </div>
                
                {renderCapacityBar(location.currentVisitors, location.capacity)}
                
                <div className="mt-3 flex justify-between items-center">
                  {renderTrend(location.trend)}
                  
                  <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {t('crowd.directions')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Forecast Tab Content */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            {crowdData.forecast.map((location) => (
              <div key={location.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-gray-900 font-medium">{location.name}</h4>
                    <div className="text-xs text-gray-500">
                      {t('crowd.dayForecast')}: {location.dayOfWeek}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {t('crowd.bestTimeToVisit')}:
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {location.bestTimeToVisit}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                  <div className="text-xs font-medium text-gray-700 mb-2">
                    {t('crowd.hourlyForecast')}:
                  </div>
                  {renderHourlyForecast(location.crowdForecast)}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-600 mr-2">{t('crowd.level.low')}</span>
                    
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs text-gray-600 mr-2">{t('crowd.level.medium')}</span>
                    
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs text-gray-600">{t('crowd.level.high')}</span>
                  </div>
                  
                  <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {t('crowd.directions')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Weekly Tab Content */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            {crowdData.weekly.map((location) => (
              <div key={location.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-gray-900 font-medium">{location.name}</h4>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {t('crowd.bestDayToVisit')}:
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {location.bestDayToVisit}
                    </div>
                    <div className="text-xs text-gray-600">
                      {t('crowd.bestTime')}: {location.bestTimeOnBestDay}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                  <div className="text-xs font-medium text-gray-700 mb-2">
                    {t('crowd.weeklyForecast')}:
                  </div>
                  {renderWeeklyForecast(location.weeklyForecast)}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-600 mr-2">{t('crowd.level.low')}</span>
                    
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs text-gray-600 mr-2">{t('crowd.level.medium')}</span>
                    
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs text-gray-600">{t('crowd.level.high')}</span>
                  </div>
                  
                  <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {t('crowd.directions')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                {t('crowd.aiPowered')}
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                {t('crowd.aiPoweredDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
