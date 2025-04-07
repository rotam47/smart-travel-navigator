import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer, ResponsiveFlex, ResponsiveGrid } from './ResponsiveComponents';
import { MapPin, Navigation, Clock, Calendar, Star, Users, Droplets, Sun, Wind, Thermometer } from 'lucide-react';

interface LocationDetailsProps {
  locationId?: string;
  position?: { lat: number; lng: number };
  className?: string;
}

export function LocationDetailsComponent({ 
  locationId = '1', 
  position = { lat: 41.0086, lng: 28.9802 },
  className = ''
}: LocationDetailsProps) {
  const { t } = useI18n();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  
  // Fetch location details
  useEffect(() => {
    // In a real implementation, this would be an API call
    // const fetchLocationDetails = async () => {
    //   const response = await fetch(`/api/locations/${locationId}`);
    //   const data = await response.json();
    //   setLocation(data);
    //   setLoading(false);
    // };
    
    // Simulate API call with mock data
    setTimeout(() => {
      setLocation({
        id: locationId,
        name: 'Hagia Sophia',
        description: 'A historic museum and former church in Istanbul, Turkey. Built in 537 AD, it was the world\'s largest building and an engineering marvel of its time.',
        position: position,
        rating: 4.8,
        reviewCount: 12543,
        images: [
          '/images/hagia-sophia-1.jpg',
          '/images/hagia-sophia-2.jpg',
          '/images/hagia-sophia-3.jpg',
        ],
        openingHours: {
          monday: '9:00 AM - 5:00 PM',
          tuesday: '9:00 AM - 5:00 PM',
          wednesday: '9:00 AM - 5:00 PM',
          thursday: '9:00 AM - 5:00 PM',
          friday: '9:00 AM - 5:00 PM',
          saturday: '9:00 AM - 5:00 PM',
          sunday: '9:00 AM - 5:00 PM',
        },
        entranceFee: '₺200',
        bestTimeToVisit: 'Early morning or late afternoon',
        crowdLevel: 'High during midday',
        estimatedVisitDuration: '2 hours',
        weather: {
          current: {
            temperature: 22,
            condition: 'Sunny',
            humidity: 65,
            windSpeed: 12,
          },
          forecast: [
            { day: 'Today', high: 24, low: 18, condition: 'Sunny' },
            { day: 'Tomorrow', high: 26, low: 19, condition: 'Partly Cloudy' },
            { day: 'Wednesday', high: 23, low: 17, condition: 'Cloudy' },
          ]
        },
        nearbyLocations: [
          { id: '2', name: 'Blue Mosque', distance: 0.5 },
          { id: '3', name: 'Topkapi Palace', distance: 0.8 },
          { id: '4', name: 'Grand Bazaar', distance: 1.2 },
        ],
        historicalInfo: {
          builtYear: 537,
          architect: 'Isidore of Miletus and Anthemius of Tralles',
          significantEvents: [
            { year: 537, event: 'Completed construction as a cathedral' },
            { year: 1453, event: 'Converted to a mosque after Ottoman conquest' },
            { year: 1935, event: 'Secularized and opened as a museum' },
            { year: 2020, event: 'Reconverted to a mosque' },
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, [locationId]);
  
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!location) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <p className="text-red-500">{t('location.notFound')}</p>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header with Image */}
      <div className="relative h-64 bg-gray-300">
        {/* This would be a real image in production */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
          <MapPin className="h-16 w-16 text-blue-400" />
        </div>
        
        {/* Location Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h2 className="text-white text-2xl font-bold">{location.name}</h2>
          <div className="flex items-center text-white mt-1">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{location.rating}</span>
            <span className="mx-1">•</span>
            <span>{location.reviewCount} {t('location.reviews')}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <ResponsiveFlex className="px-4" justify="start" items="center">
          <button 
            onClick={() => setActiveTab('info')}
            className={`py-4 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'info' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('location.information')}
          </button>
          <button 
            onClick={() => setActiveTab('weather')}
            className={`py-4 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'weather' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('location.weather')}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`py-4 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'history' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('location.history')}
          </button>
          <button 
            onClick={() => setActiveTab('nearby')}
            className={`py-4 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'nearby' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('location.nearby')}
          </button>
        </ResponsiveFlex>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Information Tab */}
        {activeTab === 'info' && (
          <div>
            <p className="text-gray-700 mb-6">{location.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{t('location.visitInfo')}</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.openingHours')}</div>
                      <div className="text-sm text-gray-600">9:00 AM - 5:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.bestTime')}</div>
                      <div className="text-sm text-gray-600">{location.bestTimeToVisit}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.crowdLevel')}</div>
                      <div className="text-sm text-gray-600">{location.crowdLevel}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.duration')}</div>
                      <div className="text-sm text-gray-600">{location.estimatedVisitDuration}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{t('location.locationInfo')}</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.coordinates')}</div>
                      <div className="text-sm text-gray-600">
                        {location.position.lat.toFixed(4)}, {location.position.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Navigation className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('location.directions')}</div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        {t('location.getDirections')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                <Navigation className="h-5 w-5 mr-2" />
                {t('location.navigate')}
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                {t('location.saveToFavorites')}
              </button>
            </div>
          </div>
        )}
        
        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{location.weather.current.temperature}°C</h3>
                  <p className="text-blue-100">{location.weather.current.condition}</p>
                </div>
                <div className="text-5xl">
                  {location.weather.current.condition === 'Sunny' ? '☀️' : 
                   location.weather.current.condition === 'Partly Cloudy' ? '⛅' : 
                   location.weather.current.condition === 'Cloudy' ? '☁️' : '🌦️'}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <Droplets className="h-6 w-6 mb-1" />
                  <div className="text-sm">{t('weather.humidity')}</div>
                  <div className="font-medium">{location.weather.current.humidity}%</div>
                </div>
                <div className="flex flex-col items-center">
                  <Wind className="h-6 w-6 mb-1" />
                  <div className="text-sm">{t('weather.wind')}</div>
                  <div className="font-medium">{location.weather.current.windSpeed} km/h</div>
                </div>
                <div className="flex flex-col items-center">
                  <Sun className="h-6 w-6 mb-1" />
                  <div className="text-sm">{t('weather.uvIndex')}</div>
                  <div className="font-medium">Moderate</div>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-4">{t('weather.forecast')}</h3>
            <div className="grid grid-cols-3 gap-4">
              {location.weather.forecast.map((day: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="font-medium">{day.day}</div>
                  <div className="text-2xl my-2">
                    {day.condition === 'Sunny' ? '☀️' : 
                     day.condition === 'Partly Cloudy' ? '⛅' : 
                     day.condition === 'Cloudy' ? '☁️' : '🌦️'}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-gray-500">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-500 text-center">
              {t('weather.disclaimer')}
            </div>
          </div>
        )}
        
        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-amber-700 text-2xl">📜</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    {t('location.historicalSite')}
                  </h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      {t('location.builtIn')} {location.historicalInfo.builtYear} {t('location.byArchitect')} {location.historicalInfo.architect}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-4">{t('location.timeline')}</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 pl-8 pb-2">
              {location.historicalInfo.significantEvents.map((event: any, index: number) => (
                <div key={index} className="mb-8 relative">
                  <div className="absolute -left-10 mt-1.5 w-5 h-5 rounded-full bg-blue-500"></div>
                  <div className="font-bold text-gray-900">{event.year}</div>
                  <div className="text-gray-700">{event.event}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                {t('location.viewInTimeMachine')} →
              </button>
            </div>
          </div>
        )}
        
        {/* Nearby Tab */}
        {activeTab === 'nearby' && (
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{t('location.nearbyAttractions')}</h3>
            
            <div className="space-y-4">
              {location.nearbyLocations.map((nearby: any) => (
                <div key={nearby.id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">{nearby.name}</div>
                    <div className="text-sm text-gray-600">{nearby.distance} km {t('location.away')}</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    {t('location.view')}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 w-full">
                {t('location.viewAllNearby')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
